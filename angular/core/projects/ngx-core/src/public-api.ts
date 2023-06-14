/*
 * Public API Surface of ngx-core
 */

export * from './lib/ngx-core.service';
export * from './lib/ngx-core.component';
export * from './lib/ngx-core.module';




export * from './lib/components/public-api';
export * from './lib/app/human-resources/public-api';



///*
//|--------------------------------------------------------------------------
//| Alerts
//|--------------------------------------------------------------------------
//|
//| Alerts are components used to bring user's attention to its content.
//| They are mainly used to display messages when working with BREAD APIs.
//|
//| =========================================================================
//*/
//export * from './lib/components/alerts/alert-danger.component';
//export * from './lib/components/alerts/alert-info.component';
//export * from './lib/components/alerts/alert-success.component';
//export * from './lib/components/alerts/alert-warning.component';
//export * from './lib/components/alerts/alert.component';
//export * from './lib/components/alerts/alert.module';
//
///*
//|--------------------------------------------------------------------------
//| Announcements
//|--------------------------------------------------------------------------
//|
//| TODO
//|
//| =========================================================================
//*/
//export * from './lib/components/announcements/attachments/attachments.component';
//export * from './lib/components/announcements/comment-item/comment-item.component';
//export * from './lib/components/announcements/comments/comments.component';
//export * from './lib/components/announcements/image-slider/image-slider.component';
//export * from './lib/components/announcements/post/post.component';
//export * from './lib/components/announcements/reaction-item/reaction-item.component';
//export * from './lib/components/announcements/announcements.module';
//
///*
//|--------------------------------------------------------------------------
//| DataTables
//|--------------------------------------------------------------------------
//|
//| TODO
//|
//| =========================================================================
//*/
//export * from './lib/components/data-table/data-table.core';
//export * from './lib/components/data-table/data-table-dialog.component';
//export * from './lib/components/data-table/data-table.component';
//export * from './lib/components/data-table/data-table.module';
//
///*
//|--------------------------------------------------------------------------
//| Details
//|--------------------------------------------------------------------------
//|
//| TODO
//|
//| =========================================================================
//*/
//export * from './lib/components/details/simple-text/simple-text.component';
//export * from './lib/components/details/details.module';
//
///*
//|--------------------------------------------------------------------------
//| Dialogs
//|--------------------------------------------------------------------------
//|
//| TODO
//|
//| =========================================================================
//*/
//export * from './lib/components/dialogs/alert-dialog/alert-dialog.component';
//export * from './lib/components/dialogs/delete-dialog/delete-dialog.component';
//export * from './lib/components/dialogs/info-dialog/info-dialog.component';
//export * from './lib/components/dialogs/dialog/dialog.component';
//export * from './lib/components/dialogs/dialog copy/dialog.component';
//export * from './lib/components/dialogs/dialog.module';
//
///*
//|--------------------------------------------------------------------------
//| Drag and Drop
//|--------------------------------------------------------------------------
//|
//| TODO
//|
//| =========================================================================
//*/
//export * from './lib/components/drag-and-drop/files/files.component';
//export * from './lib/components/drag-and-drop/image/image.component';
//export * from './lib/components/drag-and-drop/drag-and-drop.module';
//
///*
//|--------------------------------------------------------------------------
//| Dropdown Menu
//|--------------------------------------------------------------------------
//|
//| Dropdown Menu are components used to offer action options compacted
//| in a specific context.
//|
//| =========================================================================
//*/
//export * from './lib/components/dropdown-menu/dropdown-menu.component';
//export * from './lib/components/dropdown-menu/dropdown-menu.module';
//
///*
//|--------------------------------------------------------------------------
//| Empty
//|--------------------------------------------------------------------------
//|
//| Empty is a placeholder component used when no data is found in order to
//| NOT leave the screen empty
//|
//| =========================================================================
//*/
//export * from './lib/components/empty/empty.component';
//export * from './lib/components/empty/empty.module';
//
///*
//|--------------------------------------------------------------------------
//| Form
//|--------------------------------------------------------------------------
//|
//| TODO
//|
//| =========================================================================
//*/
//export * from './lib/components/form/checkbox/checkbox.component';
//export * from './lib/components/form/date-input/date-input.component';
//export * from './lib/components/form/date-range/date-range.component';
//export * from './lib/components/form/dialog-input/dialog-input.component';
//export * from './lib/components/form/number-range/number-range.component';
//export * from './lib/components/form/select-input/select-input.component';
//export * from './lib/components/form/select-multiple/select-multiple.component';
//export * from './lib/components/form/text-area/text-area.component';
//export * from './lib/components/form/text-input/text-input.component';
//export * from './lib/components/form/form.module';
//
///*
//|--------------------------------------------------------------------------
//| Icons
//|--------------------------------------------------------------------------
//|
//| Icons are components used to display inline icons. This lib provides
//| an extension to Font Awesome component to support text named icons.
//|
//| =========================================================================
//*/
//export * from './lib/components/icons/font-awesome/font-awesome.component';
//export * from './lib/components/icons/icons.module';
//
///*
//|--------------------------------------------------------------------------
//| Images
//|--------------------------------------------------------------------------
//|
//| Images are components extending default img element to include auth
//| secured resources by adding required headers when requesting content
//|
//| =========================================================================
//*/
//export * from './lib/components/images/profile-picture.component';
//export * from './lib/components/images/image.component';
//export * from './lib/components/images/image.module';
//
///*
//|--------------------------------------------------------------------------
//| Images
//|--------------------------------------------------------------------------
//|
//| TODO
//|
//| =========================================================================
//*/
//export * from './lib/components/tree-view/tree-view.component';
//export * from './lib/components/tree-view/tree-view.module';

/*
|--------------------------------------------------------------------------
| Data
|--------------------------------------------------------------------------
|
| TODO
|
| =========================================================================
*/
export * as Files from './lib/data/files';
export * from './lib/data/nationalities';

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
|
| Page is a generic component that encapsulates all the common functions
| present in the average web page. Page is optimised to deal with BREAD
| and the loading animations. 
|
| =========================================================================
*/
export * from './lib/page/page.component';

/*
|--------------------------------------------------------------------------
| Pipes
|--------------------------------------------------------------------------
|
| Pipes offer many features when they are used with Observables. this 
| library provides a secure pipe that adds the required request headers
| that is useful for image src. Pipes are declared like components so  
| importing the module is required
|
| =========================================================================
*/
export * from './lib/pipes/secure.pipe';
export * from './lib/pipes/pipes.module';

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
|
| Services are Injectables that can be use directly in component when  
| when passed as constructor param. this library provides api service
| as a suitable extension for HttpClient service. Services are declared
| in the `providers` section of the module
|
| =========================================================================
*/
export * from './lib/services/bread.service';
export * from './lib/services/common.service';

/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
|
| TODO
|
| =========================================================================
*/
export * as DateUtils from './lib/utils/dates';
export * as NumberUtils from './lib/utils/numbers';
export * as StringUtils from './lib/utils/strings';
