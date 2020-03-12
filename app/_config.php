<?php

use SilverStripe\Security\PasswordValidator;
use SilverStripe\Security\Member;
use SilverStripe\CampaignAdmin\CampaignAdmin;
use SilverStripe\Admin\CMSMenu;
use SilverStripe\Reports\ReportAdmin;
use SilverStripe\VersionedAdmin\ArchiveAdmin;
use SilverStripe\Control\Director;

Director::forceSSL();
// if (!empty($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] == 'playmarket.org.nz') {
//     Director::forceWWW();
// }

if ($member = Member::currentUser()) {
    if (!$member->isDefaultadmin()) {
        CMSMenu::remove_menu_class(ReportAdmin::class);
        CMSMenu::remove_menu_class(CampaignAdmin::class);
    }
}

// remove PasswordValidator for SilverStripe 5.0
$validator = PasswordValidator::create();
$validator->setMinLength(8);
$validator->setHistoricCount(0);
Member::set_password_validator($validator);
