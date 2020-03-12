<nav class="navbar is-transparent">
    <%-- uncomment below if nav should be wrapped in a container - and also uncomment the 42nd line --%>
    <%-- <div class="container"> --%>
        <div class="navbar-brand">
            <a class="navbar-item" href="/" id="logo" rel="start">
            <% if $SiteConfig.SiteLogo %>
                <% with $SiteConfig.SiteLogo.SetHeight(80) %>
                <img alt="$Up.Up.Title" width="$Width" height="$Height" src="$URL" />
                <% end_with %>
            <% else %>
                $SiteConfig.Title
            <% end_if %>
            </a>
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
                <% if $Children %>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link<% if LinkOrCurrent = current || $LinkOrSection = section %> is-active<% end_if %>" href="$Link">$MenuTitle.XML</a>
                    <div class="navbar-dropdown ">
                        <% loop Children %>
                            <a class="navbar-item<% if LinkOrCurrent = current %> is-active<% end_if %>" href="$Link">$MenuTitle.XML</a>
                        <% end_loop %>
                    </div>
                </div>
                <% else %>
                <a class="navbar-item<% if LinkOrCurrent = current || $LinkOrSection = section %> is-active<% end_if %>" href="$Link">$MenuTitle.XML</a>
                <% end_if %>
                <% end_loop %>
            </div>
        </div>
    <%-- </div> --%>
</nav>
