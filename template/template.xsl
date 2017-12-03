<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:import href="resource:templates/reST.xsl" />
    <xsl:variable name="newline"><xsl:text>&#xA;</xsl:text></xsl:variable>
    <xsl:template match="step" name="step">
        <div class="step">
          <xsl:copy-of select="@*"/>
          <xsl:apply-templates />
        </div>
    </xsl:template>
    <xsl:template match="note" name="note">
        <div class="notes">
            <xsl:apply-templates />
        </div>
    </xsl:template>
    <xsl:template name="logos">
        <xsl:param name="list" />
        <xsl:param name="sep" select="$newline" />
        <xsl:choose>
            <xsl:when test="contains($list, $sep)">
                <img>
                    <xsl:attribute name="class">logo_cache</xsl:attribute>
                    <xsl:attribute name="src">
                        <xsl:value-of select="substring-before($list, $sep)" />
                    </xsl:attribute>
                </img>
                <xsl:call-template name="logos">
                    <xsl:with-param name="list" select="substring-after($list, $sep)" />
                    <xsl:with-param name="sep" select="$sep" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <img>
                    <xsl:attribute name="class">logo_cache</xsl:attribute>
                    <xsl:attribute name="src">
                        <xsl:value-of select="$list" />
                    </xsl:attribute>
                </img>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="/" name="main">
        <html>
            <head>
                <title>
                    <xsl:value-of select="/document/@title"/>
                </title>
                <meta charset="utf-8"/>
                <meta name="generator" content="Hovercraft! 1.0 http://regebro.github.com/hovercraft"/>
                <xsl:if test="/document/author">
                    <meta name="author">
                        <xsl:attribute name="content">
                            <xsl:value-of select="/document/author" />
                        </xsl:attribute>
                    </meta>
                </xsl:if>
                <xsl:if test="/document/@description">
                    <meta name="description">
                        <xsl:attribute name="content">
                            <xsl:value-of select="/document/@description" />
                        </xsl:attribute>
                    </meta>
                </xsl:if>
                <xsl:if test="/document/@keywords">
                    <meta name="keywords">
                        <xsl:attribute name="content">
                            <xsl:value-of select="/document/@keywords" />
                        </xsl:attribute>
                    </meta>
                </xsl:if>
                <xsl:for-each select="/document/templateinfo/header/css">
                    <link rel="stylesheet">
                        <xsl:copy-of select="@*"/>
                    </link>
                </xsl:for-each>
                <xsl:if test="/document/@hide-slide-numbers">
                    <style>
                        .slide-number { display: none; }
                    </style>
                </xsl:if>
                <xsl:for-each select="/document/templateinfo/header/js">
                    <script type="text/javascript">
                        <xsl:copy-of select="@*"/>
                    </script>
                </xsl:for-each>
            </head>
            <body class="impress-not-supported">
                <xsl:for-each select="/document">
                    <div id="impress">
                        <xsl:if test="@data-perspective">
                            <xsl:attribute name="data-perspective">
                                <xsl:value-of select="@data-perspective" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@data-transition-duration">
                            <xsl:attribute name="data-transition-duration">
                                <xsl:value-of select="@data-transition-duration" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@auto-console">
                            <xsl:attribute name="auto-console">
                                <xsl:value-of select="@auto-console" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:for-each select="step">
                            <div class="step">
                                <xsl:copy-of select="@*"/>
                                <xsl:apply-templates />
                            </div>
                        </xsl:for-each>
                    </div>
                </xsl:for-each>
                <div id="slide-number" class="slide-number">
                    1
                </div>

                <div id="hovercraft-help">
                    <xsl:if test="/document/@skip-help">
                        <xsl:attribute name="class">hide</xsl:attribute>
                    </xsl:if>
                    <table>
                        <tr><th>Space</th><td>Forward</td></tr>
                        <tr><th>Right, Down, Page Down</th><td>Next slide</td></tr>
                        <tr><th>Left, Up, Page Up</th><td>Previous slide</td></tr>
                        <tr class="slide-number"><th>G</th><td>Go to slide number</td></tr>
                        <tr><th>P</th><td>Open presenter console</td></tr>
                        <tr><th>H</th><td>Toggle this help</td></tr>
                    </table>
                </div>
                <xsl:if test="/document/@touch-controls">
                    <div class="touch-control" id="touch-control-left">&lt;</div>
                    <div class="touch-control" id="touch-control-right" onClick="impress().next();">&gt;</div>
                </xsl:if>
                <xsl:if test="/document/@logos">
                    <div id="logos-cache">
                        <xsl:call-template name="logos">
                            <xsl:with-param name="list" select="/document/@logos" />
                        </xsl:call-template>
                    </div>
                </xsl:if>
                <script type="text/javascript">
                    var change_link_targets = true;
                    <xsl:if test="/document/@link-targets-samewindow">
                        change_link_targets = false;
                    </xsl:if>
                </script>
                <script type="text/javascript">
                    var use_touch_controls = false;
                    <xsl:if test="/document/@touch-controls">
                        use_touch_controls = true;
                    </xsl:if>
                </script>
                <xsl:for-each select="/document/templateinfo/body/js">
                    <script type="text/javascript">
                        <xsl:copy-of select="@*"/>
                    </script>
                </xsl:for-each>
                <script type="text/javascript">
                    <xsl:if test="/document/@hide-slide-numbers">
                        function change_slide_number(e) {};
                        function goto_slide_number(e) {};
                    </xsl:if>
                    document.getElementById("impress").addEventListener("impress:stepenter", change_slide_number, false);
                    document.addEventListener("keypress", goto_slide_number);
                </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
