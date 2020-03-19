<?php

namespace
{
    use SilverStripe\Forms\FieldList;
    use SilverStripe\CMS\Model\SiteTree;
    use SilverStripe\SiteConfig\SiteConfig;
    use SilverStripe\Control\Controller;
    use Leochenftw\Debugger;
    use leochenftw\Util;
    use SilverStripe\Control\Director;
    use SilverStripe\Core\Convert;
    use SilverStripe\Core\Flushable;
    use Leochenftw\Util\CacheHandler;
    use SilverStripe\Security\Member;

    class Page extends SiteTree implements Flushable
    {
        public static function flush()
        {
            CacheHandler::delete(null, 'PageData');
        }

        private static $has_one = [];

        /**
         * CMS Fields
         * @return FieldList
         */
        public function getCMSFields()
        {
            $fields =   parent::getCMSFields();

            $this->extend('updateCMSFields', $fields);

            $meta   =   $fields->fieldbyName('Root.Main.Metadata');

            $fields->removeByName([
                'Metadata'
            ]);

            $fields->addFieldToTab(
                'Root.SEO',
                $meta,
                'OG'
            );

            return $fields;
        }

        public function getData()
        {
            $siteconfig =   SiteConfig::current_site_config();
            $data       =   [
                'id'            =>  $this->ID,
                'siteconfig'    =>  $siteconfig->getData(),
                'navigation'    =>  $this->get_menu_items(),
                'title'         =>  $this->URLSegment == 'home' ? SiteConfig::current_site_config()->Title : (!empty($this->MetaTitle) ? $this->MetaTitle : $this->Title),
                'content'       =>  Util::preprocess_content($this->Content),
                'pagetype'      =>  $this->get_type($this->ClassName),
                'ancestors'     =>  $this->get_ancestors($this),
                'meta'          =>  [
                    'keywords'      =>  !empty($this->MetaKeywords) ? Convert::raw2att($this->MetaKeywords) : null,
                    'description'   =>  !empty($this->MetaDescription) ? Convert::raw2att($this->MetaDescription) : null,
                    'robots'        =>  Director::isLive() ?
                                        (!empty($this->MetaRobots) ? Convert::raw2att($this->MetaRobots) : 'INDEX, FOLLOW') :
                                        'noindex, nofollow, noarchive',
                    'social'        =>  $this->get_og_twitter_meta()
                ]
            ];

            if (!empty($this->ConanicalURL)) {
                $data['meta']['canonical']  =   str_replace(
                    Director::absoluteBaseURL(),
                    $siteconfig->SocialBaseURL,
                    $this->ConanicalURL ? Convert::raw2att($this->ConanicalURL) : $this->AbsoluteLink()
                );
            }

            $this->extend('getData', $data);

            return $data;
        }

        public function get_meta_description()
        {
            if (!empty($this->MetaDescription)) {
                return Convert::raw2att($this->MetaDescription);
            } elseif (!empty(SiteConfig::current_site_config()->MetaDescription)) {
                return Convert::raw2att(SiteConfig::current_site_config()->MetaDescription);
            }

            return Convert::raw2att(Util::getWords($this->Content, 50));
        }

        private function get_og_twitter_meta()
        {
            $site_config    =   SiteConfig::current_site_config();
            if (!empty($this->OGType) || !empty($site_config->OGType)) {
                $data   =   [
                    [
                        'property'  =>  'og:type',
                        'content'   =>  !empty($this->OGType) ? $this->OGType : $site_config->OGType
                    ],
                    [
                        'property'  =>  'og:url',
                        'content'   =>  $this->AbsoluteLink()
                    ],
                    [
                        'property'  =>  'og:title',
                        'content'   =>  !empty($this->OGTitle) ? $this->OGTitle : $this->Title
                    ],
                    [
                        'property'  =>  'og:description',
                        'content'   =>  !empty($this->OGDescription) ? $this->OGDescription : $site_config->OGDescription
                    ],
                    [
                        'property'  =>  'og:image',
                        'content'   =>  $this->OGImage()->exists() ?
                                        $this->OGImage()->getCropped()->getAbsoluteURL() :
                                        ($site_config->OGImage()->exists() ?
                                        $site_config->OGImage()->getCropped()->getAbsoluteURL() : null)
                    ],
                    [
                        'property'  =>  'og:image:width',
                        'content'   =>  $this->OGImage()->exists() ?
                                        $this->OGImage()->getCropped()->Width :
                                        ($site_config->OGImage()->exists() ? $site_config->OGImage()->getCropped()->Width : null)
                    ],
                    [
                        'property'  =>  'og:image:height',
                        'content'   =>  $this->OGImage()->exists() ?
                                        $this->OGImage()->getCropped()->Height :
                                        ($site_config->OGImage()->exists() ? $site_config->OGImage()->getCropped()->Height : null)
                    ],
                    [
                        'property'  =>  'og:image',
                        'content'   =>  $this->OGImageLarge()->exists() ?
                                        $this->OGImageLarge()->getCropped()->getAbsoluteURL() :
                                        ($site_config->OGImageLarge()->exists() ? $site_config->OGImageLarge()->getCropped()->getAbsoluteURL() : null)
                    ],
                    [
                        'property'  =>  'og:image:width',
                        'content'   =>  $this->OGImageLarge()->exists() ?
                                        $this->OGImageLarge()->getCropped()->Width :
                                        ($site_config->OGImageLarge()->exists() ? $site_config->OGImageLarge()->getCropped()->Width : null)
                    ],
                    [
                        'property'  =>  'og:image:height',
                        'content'   =>  $this->OGImageLarge()->exists() ?
                                        $this->OGImageLarge()->getCropped()->Height :
                                        ($site_config->OGImageLarge()->exists() ? $site_config->OGImageLarge()->getCropped()->Height : null)
                    ],
                    [
                        'name'      =>  'twitter:card',
                        'content'   =>  !empty($this->TwitterCard) ? $this->TwitterCard : $site_config->TwitterCard
                    ],
                    [
                        'name'      =>  'twitter:site',
                        'content'   =>  $this->AbsoluteLink()
                    ],
                    [
                        'name'      =>  'twitter:title',
                        'content'   =>  !empty($this->TwitterTitle) ? $this->TwitterTitle : $this->Title
                    ],
                    [
                        'name'      =>  'twitter:creator',
                        'content'   =>  '@zeffercider'
                    ],
                    [
                        'name'      =>  'twitter:description',
                        'content'   =>  !empty($this->TwitterDescription) ?
                                        $this->TwitterDescription :
                                        $site_config->TwitterDescription
                    ],
                    [
                        'name'      =>  'twitter:image',
                        'content'   =>  $this->get_twitter_image()
                    ],
                    [
                        'itemprop'  =>  'name',
                        'content'   =>  !empty($this->OGTitle) ? $this->OGTitle : $this->Title
                    ],
                    [
                        'itemprop'  =>  'image',
                        'content'   =>  !empty($this->OGImage()->exists()) ?
                                        $this->OGImage()->getCropped()->getAbsoluteURL() :
                                        ($site_config->OGImage()->exists() ? $site_config->OGImage()->getCropped()->getAbsoluteURL() : null)
                    ]
                ];

                if ($base_url = $site_config->SocialBaseURL) {
                    $refined    =   [];
                    foreach ($data as $item) {
                        if (!empty($item['content'])) {
                            $refined_item   =   [];
                            foreach ($item as $key => $value) {
                                $refined_item[$key] =   str_replace(Director::absoluteBaseURL(), $base_url, $value);
                            }
                            $refined[]  =   $refined_item;
                        }
                    }

                    return $refined;
                }

                return $data;
            }
            return null;
        }

        private function get_twitter_image()
        {
            if (!empty($this->TwitterCard)) {
                if ($this->TwitterCard == 'summary') {
                    if ($this->TwitterImage()->exists()) {
                        return $this->TwitterImage()->getCropped()->getAbsoluteURL();
                    }
                } else {
                    if ($this->TwitterImageLarge()->exists()) {
                        return $this->TwitterImageLarge()->getCropped()->getAbsoluteURL();
                    }
                }
            }

            return null;
        }

        private function get_ancestors($item, $ancestors = [])
        {
            if (!$item->Parent()->exists()) {
                return array_reverse($ancestors);
            }

            $ancestors[]    =   [
                'title' =>  $item->Parent()->Title,
                'link'   =>  $item->Parent()->Link() != '/' ? rtrim($item->Parent()->Link(), '/') : '/'
            ];

            return $this->get_ancestors($item->Parent(), $ancestors);
        }

        private function get_menu_items($nav = null)
        {
            $controller =   Controller::curr();
            $controller =   !$controller->hasMethod('getMenu') ? PageController::create() : $controller;
            $nav        =   empty($nav) ? $controller->getMenu(1) : $nav;
            $list       =   [];
            foreach ($nav as $item) {
                $link   =   $item->Link();

                $list[] =   [
                    'label'     =>  $item->Title,
                    'url'       =>  $link,
                    'active'    =>  $item->isSection() || $item->isCurrent(),
                    'sub'       =>  $this->get_menu_items($item->Children()),
                    'pagetype'  =>  $this->get_type($item->ClassName)
                ];
            }
            return $list;
        }

        private function get_type($class)
        {
            $seg    =   explode('\\', $class);
            return $seg[count($seg) - 1];
        }

        /**
         * Event handler called after writing to the database.
         */
        protected function onAfterWrite()
        {
            parent::onAfterWrite();
            CacheHandler::delete(null, 'PageData');
        }

        public function get_cms_edit_link()
        {
            return Controller::join_links(
                Director::absoluteURL(Director::baseURL()),
                'admin',
                'pages',
                'edit',
                'show',
                $this->ID
            );
        }
    }
}
