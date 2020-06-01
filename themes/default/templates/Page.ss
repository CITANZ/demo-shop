<!DOCTYPE html>
<!--[if !IE]><!-->
<html lang="$ContentLocale">
<!--<![endif]-->
<!--[if IE 6 ]><html lang="$ContentLocale" class="ie ie6"><![endif]-->
<!--[if IE 7 ]><html lang="$ContentLocale" class="ie ie7"><![endif]-->
<!--[if IE 8 ]><html lang="$ContentLocale" class="ie ie8"><![endif]-->
<head>
    $SiteConfig.GoogleSiteVerificationCode.RAW
    <% base_tag %>
    <title><% if $URLSegment == 'home' %><% if $MetaTitle %>$MetaTitle<% else %>$SiteConfig.Title<% end_if %><% else %><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %><% end_if %></title>
    <meta charset="utf-8" data-vue-meta="1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" data-vue-meta="1">
    $MetaTags(false)
    <% include OG %>
    $SiteConfig.VueCSS.RAW
    <%-- <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#000000">
    <meta name="theme-color" content="#ffffff"> --%>
    $SiteConfig.GoogleAnalyticsCode.RAW
    $SiteConfig.GTMHead.RAW
</head>
<body <% if $i18nScriptDirection %>dir="$i18nScriptDirection"<% end_if %> data-preferredlang="$PreferredLang">
$SiteConfig.GTMBody.RAW
<% if $URLSegment == 'Security' %>
<main id="main" class="main">
    $Layout
</main>
<% else %>
<div id="app" class="">
    <% include Header %>
    <main id="main" class="main">
        $Layout
    </main>
    <% include Footer %>
</div>
$SiteConfig.VueJS.RAW
<% end_if %>
</body>
</html>
