<nav class="navbar is-transparent">
    <%-- uncomment below if nav should be wrapped in a container - and also uncomment the 42nd line --%>
    <%-- <div class="container"> --%>
        <div class="navbar-brand">
            <% if $URLSegment == 'home' %>
            <h1 class="navbar-item">
            <% end_if %>
            <a <% if $URLSegment != 'home' %>class="navbar-item" <% end_if %>href="/" id="logo" rel="start">
            <% if $SiteConfig.SiteLogo %>
                <% with $SiteConfig.SiteLogo.SetHeight(80) %>
                <img alt="$Up.Up.Title" width="$Width" height="$Height" src="$URL" />
                <% end_with %>
            <% else %>
                $SiteConfig.Title
            <% end_if %>
            </a>
            <% if $URLSegment == 'home' %>
            </h1>
            <% end_if %>
            <div id="btn-mobile-menu" class="navbar-burger" data-target="main-nav">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="main-nav" class="navbar-menu">
            <div class="navbar-end">
                <%-- Uncomment below --%>
                <%-- <% loop $MenuSet('Main Menu').MenuItems %> --%>
                <%-- and comment the NEXT LINE (literally, the one below) if using menu manager --%>
                <% loop Menu(1) %>
                <a class="navbar-item<% if LinkOrCurrent = current || $LinkOrSection = section %> is-active<% end_if %>" href="$Link">$MenuTitle.XML</a>
                <% end_loop %>
                <a class="navbar-item<% if LinkOrCurrent = current || $LinkOrSection = section %> is-active<% end_if %>" href="/cart">Cart</a>
            </div>
        </div>
    <%-- </div> --%>
</nav>
