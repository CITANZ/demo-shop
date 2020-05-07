<?php

namespace
{
    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\Core\Config\Config;
    use SilverStripe\Core\Convert;
    use SilverStripe\Control\HTTPRequest;
    use SilverStripe\SiteConfig\SiteConfig;
    use SilverStripe\View\ArrayData;
    use SilverStripe\View\Requirements;
    use SilverStripe\Control\Director;
    use SilverStripe\ErrorPage\ErrorPage;
    use SilverStripe\Security\SecurityToken;
    use SilverStripe\Security\Member;
    use Cita\eCommerce\eCommerce;
    use SilverStripe\Control\Session;
    use SilverStripe\Core\Injector\Injector;
    use TractorCow\Fluent\State\FluentState;
    use TractorCow\Fluent\State\LocaleDetector;

    class PageController extends ContentController
    {
        private static $allowed_actions = [];

        protected function handleAction($request, $action)
        {
            if ($this->request->httpMethod() === 'OPTIONS' ) {
                // create direct response without requesting any controller
                $response   =   $this->getResponse();
                // set CORS header from config
                $response   =   $this->addCORSHeaders($response);
                $response->output();
                exit;
            }

            if (!$this->request->isAjax()) {
                return parent::handleAction($request, $action);
            }

            $header = $this->getResponse();
            $this->addCORSHeaders($header);

            if (SiteConfig::current_site_config()->UnderMaintenance && !$this->isAdmin()) {
                $header->setStatusCode(503, 'Under maintenance');

                $error_page =   ErrorPage::get()->filter(['ErrorCode' => 503])->first();

                if (!$error_page) {
                    $error_page             =   Page::create();
                    $error_page->Title      =   'Under Maintenance';
                    $error_page->Content    =   '<p>CITANZ is under maintenance. Please check back later.</p>';
                }

                return json_encode($error_page->getData());
            }

            return json_encode(array_merge($this->getData(), [
                'session' => array_merge([
                    'csrf' => SecurityToken::inst()->getSecurityID()
                ], $this->Locales()->exists() ? [
                    'locale' => $this->PreferredLang,
                    'locales' => $this->Locales()->map('Locale', 'Title')->toArray()
                ] : [])
            ]));
        }

        public function isAdmin()
        {
            return Member::currentUser() && Member::currentUser()->inGroup('administrators');
        }

        protected function init()
        {
            parent::init();
            Requirements::css('leochenftw/leoss4bk: client/dist/app.css');

            $gateways = eCommerce::get_available_payment_methods();

            if (is_array($gateways) && in_array('Stripe', $gateways)) {
                Requirements::javascript('https://js.stripe.com/v3/');
            }

            Requirements::javascript('leochenftw/leoss4bk: client/dist/app.js');
        }

        public function MetaTags($includeTitle = true)
        {
            $tags = '';

            if ($this->ConanicalURL) {
                $tags .= "<link rel=\"canonical\" href=\"" . Convert::raw2att($this->ConanicalURL) . "\" data-vue-meta=\"1\" />\n";
            }

            if ($this->MetaKeywords) {
                $tags .= "<meta name=\"keywords\" content=\"" . Convert::raw2att($this->MetaKeywords) . "\" data-vue-meta=\"1\" />\n";
            }

            if ($this->MetaDescription) {
                $tags .= "<meta name=\"description\" content=\"" . Convert::raw2att($this->MetaDescription) . "\" data-vue-meta=\"1\" />\n";
            }

            if ($this->ExtraMeta) {
                $tags .= $this->ExtraMeta . "\n";
            }

            if ($this->URLSegment == 'home' && SiteConfig::current_site_config()->GoogleSiteVerificationCode) {
                $tags .= '<meta name="google-site-verification" content="'
                        . SiteConfig::current_site_config()->GoogleSiteVerificationCode . '" />' . "\n";
            }

            // prevent bots from spidering the site whilest in dev.
            if (!Director::isLive()) {
                $tags .= "<meta name=\"robots\" content=\"noindex, nofollow, noarchive\" data-vue-meta=\"1\" />\n";
            } elseif (!empty($this->MetaRobots)) {
                $tags .= "<meta name=\"robots\" content=\"$this->MetaRobots\" data-vue-meta=\"1\" />\n";
            } else {
                $tags .= "<meta name=\"robots\" content=\"INDEX, FOLLOW\" data-vue-meta=\"1\" />\n";
            }

            $this->extend('MetaTags', $tags);

            return $tags;
        }

        public function getOGTwitter()
        {
            $site_config    =   SiteConfig::current_site_config();
            if (!empty($this->OGType) || !empty($site_config->OGType)) {
                $data       =   [
                    'OGType'                =>  !empty($this->OGType) ?
                                                $this->OGType :
                                                $site_config->OGType,
                    'AbsoluteLink'          =>  $this->AbsoluteLink(),
                    'OGTitle'               =>  !empty($this->OGTitle) ?
                                                $this->OGTitle :
                                                $this->Title,
                    'OGDescription'         =>  !empty($this->OGDescription) ?
                                                $this->OGDescription :
                                                $site_config->OGDescription,
                    'OGImage'               =>  !empty($this->OGImage()->exists()) ?
                                                $this->OGImage() :
                                                $site_config->OGImage(),
                    'OGImageLarge'          =>  !empty($this->OGImageLarge()->exists()) ?
                                                $this->OGImageLarge() :
                                                $site_config->OGImageLarge(),
                    'TwitterCard'           =>  !empty($this->TwitterCard) ?
                                                $this->TwitterCard :
                                                $site_config->TwitterCard,
                    'TwitterCreator'        =>  '@zeffercider',
                    'TwitterTitle'          =>  !empty($this->TwitterTitle) ?
                                                $this->TwitterTitle :
                                                $this->Title,
                    'TwitterDescription'    =>  !empty($this->TwitterDescription) ?
                                                $this->TwitterDescription :
                                                $site_config->TwitterDescription,
                    'TwitterImageLarge'     =>  !empty($this->TwitterImageLarge()->exists()) ?
                                                $this->TwitterImageLarge() :
                                                $site_config->TwitterImageLarge(),
                    'TwitterImage'          =>  !empty($this->TwitterImage()->exists()) ?
                                                $this->TwitterImage() :
                                                $site_config->TwitterImage(),
                ];

                return ArrayData::create($data);
            }

            return null;
        }

        protected function addCORSHeaders($response)
        {
            if (Director::isDev()) {
                $config =   Config::inst()->get('Leochenftw\Restful\RestfulController');

                $response->addHeader('Access-Control-Allow-Origin', $this->request->getHeader('origin'));
                $response->addHeader('Access-Control-Allow-Methods', $config['CORSMethods']);
                $response->addHeader('Access-Control-Max-Age', $config['CORSMaxAge']);
                $response->addHeader('Access-Control-Allow-Headers', $config['CORSAllowHeaders']);
                if ($config['CORSAllowCredentials']) {
                    $response->addHeader('Access-Control-Allow-Credentials', 'true');
                }
            }

            $response->addHeader('Content-Type', 'application/json');

            return $response;
        }

        public function getYear()
        {
            return date('Y', time());
        }

        public function getPreferredLang()
        {
            $request = $this->request;

            if (!$request->getSession()->get('UserPreferredLang')) {
                $detector = Injector::inst()->get(LocaleDetector::class);
                $localeObj = $detector->detectLocale($request);
                if ($localeObj) {
                    $detected_locale = $localeObj->getLocale();
                    $this->request->getSession()->set('UserPreferredLang', $detected_locale);
                    return $detected_locale;
                }

                $detected_locale = FluentState::singleton()->getLocale();
                $this->request->getSession()->set('UserPreferredLang', $detected_locale);
                return $detected_locale;
            }

            return $this->request->getSession()->get('UserPreferredLang');
        }

        public function getTestTitle()
        {
            _t('Cita\eCommerce\Controller\Cart' . 'TITLE', 'Cart');
        }
    }
}
