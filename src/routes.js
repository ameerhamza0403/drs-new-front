import React from 'react';
import AccountListing from './components/myaccount/admin/account/accounts/listing';
//import TrackingDeviceListing from './components/myaccount/admin/vehicle/trackingdevice/listing';

const CodeEditors = React.lazy(() => import('./views/Editors/CodeEditors'));
const TextEditors = React.lazy(() => import('./views/Editors/TextEditors'));

const Compose = React.lazy(() => import('./views/Apps/Email/Compose'));
const Inbox = React.lazy(() => import('./views/Apps/Email/Inbox'));
const Message = React.lazy(() => import('./views/Apps/Email/Message'));
const Invoice = React.lazy(() => import('./views/Apps/Invoicing/Invoice'));

const AdvancedForms = React.lazy(() => import('./views/Forms/AdvancedForms'));
const BasicForms = React.lazy(() => import('./views/Forms/BasicForms'));
const ValidationForms = React.lazy(() => import('./views/Forms/ValidationForms'));
const GoogleMaps = React.lazy(() => import('./views/GoogleMaps'));
const Toastr = React.lazy(() => import('./views/Notifications/Toastr'));
const Calendar = React.lazy(() => import('./views/Plugins/Calendar'));
const Draggable = React.lazy(() => import('./views/Plugins/Draggable'));
const Spinners = React.lazy(() => import('./views/Plugins/Spinners'));
const DataTable = React.lazy(() => import('./views/Tables/DataTable'));
const Tables = React.lazy(() => import('./views/Tables/Tables'));
const LoadingButtons = React.lazy(() => import('./views/Buttons/LoadingButtons'));

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));

const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const SpinnersB4 = React.lazy(() => import('./views/Base/Spinners'));
const Switches = React.lazy(() => import('./views/Base/Switches'));

const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// my components

const ResourceGroupListing = React.lazy(() => import('./components/myaccount/admin/resources/group/listing'));
const ResourceSkillListing = React.lazy(() => import('./components/myaccount/admin/resources/skills/listing'));
const AddeditListing = React.lazy(() => import('./components/myaccount/admin/resources/addedit/listing'));
const CustomFieldListing = React.lazy(() => import('./components/myaccount/admin/resources/customfield/listing'));
const AbsenceListing = React.lazy(() => import('./components/myaccount/admin/resources/absencetype/listing'));
const CurrencyListing = React.lazy(() => import('./components/myaccount/admin/resources/currency/listing'));
const ContactsGroupListingTable = React.lazy(() => import('./components/myaccount/admin/contactnote/contactgroup/listing'));
const NotesFlagListingTable = React.lazy(() => import('./components/myaccount/admin/contactnote/notesflag/listing'));
const NotesTypeListing = React.lazy(() => import('./components/myaccount/admin/contactnote/notetype/listing'));
const PersonFlagListing = React.lazy(() => import('./components/myaccount/admin/contactnote/personflag/listing'));
const VehicleGroupListing = React.lazy(() => import('./components/myaccount/admin/vehicle/group/listing'));
const VehicleTypeListing = React.lazy(() => import('./components/myaccount/admin/vehicle/type/listing'));
const DriverBehaviour = React.lazy(() => import('./components/myaccount/admin/resources/driverbehaviour/main'));
const VehicleAttribute = React.lazy(() => import('./components/myaccount/admin/vehicle/attribute/listing'));
const VehicleCheckTypeListing = React.lazy(() => import('./components/myaccount/admin/vehicle/checktype/listing'));
const VehicleCheck = React.lazy(() => import('./components/myaccount/admin/vehicle/vehiclecheck/listing'));
const VehicleFuelCost = React.lazy(() => import('./components/myaccount/admin/vehicle/fuelcheck/listing'));
const JobFlagListing = React.lazy(() => import('./components/myaccount/admin/schedule/jobflag/listing'));
const JobCategoryListing = React.lazy(() => import('./components/myaccount/admin/schedule/jobcategory/listing'));
const PhoneBookListing = React.lazy(() => import('./components/myaccount/admin/resources/phonebook/listing'));
const VehicleManage = React.lazy(() => import('./components/myaccount/admin/vehicle/manage/listing'));
const TrackingDeviceListing = React.lazy(() => import('./components/myaccount/admin/vehicle/trackingdevice/listing'));
const WorkSheetListing = React.lazy(() => import('./components/myaccount/admin/schedule/worksheet/listing'));
const JobTypeListing = React.lazy(() => import('./components/myaccount/admin/schedule/jobtype/listing'));

const JobGroupTemplateListing = React.lazy(() => import('./components/myaccount/admin/schedule/jobgrouptemplate/listing'));
const FinanceDocListing = React.lazy(() => import('./components/myaccount/admin/financial/docnsale/listing'));
const VatCodeListing = React.lazy(() => import('./components/myaccount/admin/financial/vatcode/listing'));
const SaleOppProbListing = React.lazy(() => import('./components/myaccount/admin/financial/saleprobability/listing'));
const DoortypeListing = React.lazy(() => import('./components/myaccount/admin/financial/doortype/listing'));
const PredefInvoiceListing = React.lazy(() => import('./components/myaccount/admin/financial/predefinvoice/listing'));
const FileGroupListing = React.lazy(() => import('./components/myaccount/admin/forms/filegroup/listing'));
const FileLibraryListing = React.lazy(() => import('./components/myaccount/admin/forms/filelibrary/listing'));
const NominalCodeListing = React.lazy(() => import('./components/myaccount/admin/financial/nominalcode/listing'));
const DepartmentCodeListing = React.lazy(() => import('./components/myaccount/admin/financial/departmentcode/listing'));
const SalesOpportunityFlag = React.lazy(() => import('./components/myaccount/admin/financial/salesopportunityflag/listing'));
const SalesOpportunityStage = React.lazy(() => import('./components/myaccount/admin/financial/salesopportunitystage/listing'));


//Stock
const ProductCategoryListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/productcategory/listing'));
const ManageModelListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/model/listing'));
const MakeListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/make/listing'));
const VendorGroupListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/vendorgroup/listing'));
const PaymentTermListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/paymentterm/listing'));
// const ManageMakesnModelListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/managemakesnmode/listing'));
const ManageStockItems = React.lazy(() => import('./components/myaccount/admin/stocknequipment/stockitem/listing'));
const LocationListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/location/listing'));
const BusinessPartnerListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/businesspartner/listing'));
const StorageLocationListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/storagelocation/listing'));
const PurchasegroupListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/purchasegroup/listing'));
const UnitListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/unit/listing'));
const WarehouseListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/warehouse/listing'));
const CustomerAssetsListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/customerasset/listing'));
const AssetTypeListing = React.lazy(() => import('./components/myaccount/admin/stocknequipment/assettype/listing'));


//Form
const TimesheetActivityListing = React.lazy(() => import('./components/myaccount/admin/forms/timesheetactivity/listing'));
const ExpenseCategoryListing = React.lazy(() => import('./components/myaccount/admin/forms/expensecategory/listing'));
//Web Users
const RoleListing = React.lazy(() => import('./components/myaccount/admin/webusers/role/listing'));
const UserListing = React.lazy(() => import('./components/myaccount/admin/webusers/adduser/listing'));
const EditAccount = React.lazy(() => import('./components/myaccount/admin/account/accounts/edit/main'));
const TemplateListing = React.lazy(() => import('./components/myaccount/admin/account/template/listing'));

// const TestListing = React.lazy(() => import('./components/myaccount/admin/test/test/listing'));

//Account
const TemplateKeywordListing = React.lazy(() => import('./components/myaccount/admin/account/templatekeywords/listing'));
const TemplateUsageListing = React.lazy(() => import('./components/myaccount/admin/account/templateusage/listing'));
const TemplateUsageTypeListing = React.lazy(() => import('./components/myaccount/admin/account/templateusagetype/listing'));

const TestListing = React.lazy(() => import('./components/myaccount/admin/test/test/listing'));


// ****************************SYSTEM CRM*****************************/
const CrmContactsListing = React.lazy(() => import('./components/system/crm/contacts/listing'));
const CrmContactPersonListing = React.lazy(() => import('./components/system/crm/contactperson/main'));
const CrmNotesListing = React.lazy(() => import('./components/system/crm/notes/main'));
const ActivityTypeListing = React.lazy(() => import('./components/myaccount/admin/contactnote/activitytype/listing'));
const CrmNotesActivity = React.lazy(() => import('./components/system/crm/noteactivity/main'));
const CrmHome = React.lazy(() => import('./components/system/crm/crm'));
const CrmLeadMain = React.lazy(() => import('./components/system/crm/lead/main'));
const MarketingCompaignTypeListing = React.lazy(() => import('./components/system/crm/marketingcompaigntype/listing'));
const CrmMarketingCampainMain = React.lazy(() => import('./components/system/crm/marketingcampaign/main'));
const MarketingList = React.lazy(() => import('./components/system/crm/marketinglist/listing'));
const MarkListMapListing = React.lazy(() => import('./components/system/crm/marketinglistmap/listing'));
const CrmMarketingMemberList = React.lazy(() => import('./components/system/crm/marketingmemberlist/main'));
const CrmSalesListing = React.lazy(() => import('./components/system/crm/sales/main'));




// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/spinners', name: 'Spinners', component: SpinnersB4 },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/buttons/loading-buttons', name: 'Loading Buttons', component: LoadingButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/editors', name: 'Editors', component: CodeEditors, exact: true },
  { path: '/editors/code-editors', name: 'Code Editors', component: CodeEditors },
  { path: '/editors/text-editors', name: 'Text Editors', component: TextEditors },
  { path: '/forms', name: 'Forms', component: BasicForms, exact: true },
  { path: '/forms/advanced-forms', name: 'Advanced Forms', component: AdvancedForms },
  { path: '/forms/basic-forms', name: 'Basic Forms', component: BasicForms },
  { path: '/forms/validation-forms', name: 'Form Validation', component: ValidationForms },
  { path: '/map', name: 'Maps', component: GoogleMaps },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toastr', name: 'Toastr', component: Toastr },
  { path: '/plugins', name: 'Plugins', component: Calendar, exact: true },
  { path: '/plugins/calendar', name: 'Calendar', component: Calendar },
  { path: '/plugins/draggable', name: 'Draggable Cards', component: Draggable },
  { path: '/plugins/spinners', name: 'Spinners', component: Spinners },
  { path: '/tables', name: 'Tables', component: Tables, exact: true },
  { path: '/tables/data-table', name: 'Data Table', component: DataTable },
  { path: '/tables/tables', name: 'Tables', component: Tables },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/apps', name: 'Apps', component: Compose, exact: true },
  { path: '/apps/email', name: 'Email', component: Compose, exact: true },
  { path: '/apps/email/compose', name: 'Compose', component: Compose },
  { path: '/apps/email/inbox', name: 'Inbox', component: Inbox },
  { path: '/apps/email/message', name: 'Message', component: Message },
  { path: '/apps/invoicing', name: 'Invoice', component: Invoice, exact: true },
  { path: '/apps/invoicing/invoice', name: 'Invoice', component: Invoice },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  //my routes
  { path: '/admin/staff/group', exact: true, name: 'Staff Groups', component: ResourceGroupListing },
  { path: '/admin/staff/skills', exact: true, name: 'Staff Skills', component: ResourceSkillListing },
  { path: '/admin/staff/custom', exact: true, name: 'Custom Fields', component: CustomFieldListing },
  { path: '/admin/staff/manage', exact: true, name: 'Manage Staff', component: AddeditListing },
  { path: '/admin/staff/absencetype', exact: true, name: 'Absence Types', component: AbsenceListing },
  { path: '/admin/contact/group', exact: true, name: 'Contact Groups', component: ContactsGroupListingTable },
  { path: '/admin/contact/flag', exact: true, name: 'Person Flags', component: PersonFlagListing },
  { path: '/admin/contact/type', exact: true, name: 'Note types', component: NotesTypeListing },
  { path: '/admin/currency', exact: true, name: 'Currency', component: CurrencyListing },
  { path: '/admin/note/flag', exact: true, name: 'Note Flags', component: NotesFlagListingTable },
  { path: '/admin/vehicle/group', exact: true, name: 'Vehicle Group', component: VehicleGroupListing },
  { path: '/admin/vehicle/type', exact: true, name: 'Vehicle Type', component: VehicleTypeListing },
  { path: '/admin/staff/driver', exact: true, name: 'Driver Behaviour', component: DriverBehaviour },
  { path: '/admin/vehicle/attribute', exact: true, name: 'Vehicle Attributes', component: VehicleAttribute },
  { path: '/admin/vehicle/check', exact: true, name: 'Vehicle Check', component: VehicleCheck },
  { path: '/admin/vehicle/check/type', exact: true, name: 'Vehicle Check Type', component: VehicleCheckTypeListing },
  { path: '/admin/vehicle/fuel', exact: true, name: 'Fuel Cost', component: VehicleFuelCost },
  { path: '/admin/vehicle/trackingdevice', exact: true, name: 'Tracking Device', component: TrackingDeviceListing },
  { path: '/admin/schedule/jobflag', exact: true, name: 'Job Flags', component: JobFlagListing },
  { path: '/admin/schedule/jobcategory', exact: true, name: 'Job Category', component: JobCategoryListing },
  { path: '/admin/staff/phone', exact: true, name: 'Phone Book', component: PhoneBookListing },
  { path: '/admin/vehicle/manage', exact: true, name: 'Manage Vehicle', component: VehicleManage },

  { path: '/admin/schedule/jobtype', exact: true, name: 'Job Type', component: JobTypeListing },
  { path: '/admin/schedule/jobgroup', exact: true, name: 'Job Group Template', component: JobGroupTemplateListing },

  { path: '/admin/schedule/jobgroup', exact: true, name: 'Job Group Template', component: JobGroupTemplateListing },
  { path: '/admin/schedule/worksheet', exact: true, name: 'Work Sheet', component: WorkSheetListing },


  { path: '/admin/schedule/jobgroup', exact: true, name: 'Job Group Template', component: JobGroupTemplateListing },
  { path: '/admin/schedule/worksheet', exact: true, name: 'Work Sheet', component: WorkSheetListing },
  { path: '/admin/finance/docs', exact: true, name: 'Work Sheet', component: FinanceDocListing },
  { path: '/admin/finance/vat', exact: true, name: 'VAT Code', component: VatCodeListing },
  { path: '/admin/finance/saleprob', exact: true, name: 'Sales Opportunity Probabilities', component: SaleOppProbListing },
  { path: '/admin/finance/doortype', exact: true, name: 'Door Type', component: DoortypeListing },
  { path: '/admin/finance/predefinvoice', exact: true, name: 'Predefined Invoicing Items', component: PredefInvoiceListing },
  { path: '/admin/form/filegroup', exact: true, name: 'File Group', component: FileGroupListing },
  { path: '/admin/form/filelibrary', exact: true, name: 'File Library', component: FileLibraryListing },
  { path: '/admin/finance/departmentcode', exact: true, name: 'Department Code', component:  DepartmentCodeListing },

  { path: '/admin/finance/nominalcode', exact: true, name: 'Nominal code', component:  NominalCodeListing },
  { path: '/admin/finance/sale', exact: true, name: 'Sales Opportunity Stages', component:  SalesOpportunityStage },
  { path: '/admin/finance/saleflag', exact: true, name: 'Sales Opportunity Flags', component:  SalesOpportunityFlag },

  //Stock
  { path: '/admin/stocknequipment/productcategory', exact: true, name: 'Product Categories', component:  ProductCategoryListing },
  { path: '/admin/stocknequipment/model', exact: true, name: 'Manage Models', component:  ManageModelListing },
  { path: '/admin/stocknequipment/make', exact: true, name: 'Make', component:  MakeListing },
  { path: '/admin/stocknequipment/Vendorgroup', exact: true, name: 'Vendor Group', component:  VendorGroupListing },
  { path: '/admin/stocknequipment/paymentterm', exact: true, name: 'Payment Term', component:  PaymentTermListing },
  // { path: '/admin/stocknequipment/managemakesnmodel', exact: true, name: 'Manege Makes & Models', component:  ManageMakesnModelListing },
  { path: '/admin/stocknequipment/stockitem', exact: true, name: 'Stock Item', component:  ManageStockItems },
  { path: '/admin/stocknequipment/location', exact: true, name: 'Location', component:  LocationListing },
  { path: '/admin/stocknequipment/supplier', exact: true, name: 'Supplier', component:  BusinessPartnerListing },
  { path: '/admin/stocknequipment/storage', exact: true, name: 'Storage Location', component:  StorageLocationListing },
  { path: '/admin/stocknequipment/purchase', exact: true, name: 'Purchase Group', component:  PurchasegroupListing },
  { path: '/admin/stocknequipment/unit', exact: true, name: 'Unit', component:  UnitListing },
  { path: '/admin/stocknequipment/warehouse', exact: true, name: 'WareHouse', component:  WarehouseListing },
  { path: '/admin/stocknequipment/customerassets', exact: true, name: 'Customer Assets', component:  CustomerAssetsListing },
  { path: '/admin/stocknequipment/asset-type', exact: true, name: 'Asset Type', component:  AssetTypeListing },

  //Form
  { path: '/admin/forms/timesheetactivity', exact: true, name: 'Timesheet Activities', component:  TimesheetActivityListing },
  { path: '/admin/forms/expensecategory', exact: true, name: 'Expense Categories', component:  ExpenseCategoryListing },

  //Web USers
  { path: '/admin/webusers/role', exact: true, name: 'Roles', component:  RoleListing },
  { path: '/admin/webusers/adduser', exact: true, name: 'Add User', component:  UserListing },

  //Account
  { path: '/admin/account/accounts', exact: true, name: 'Account Settings', component:  AccountListing },
  { path: '/admin/account/template', exact: true, name: 'Template', component:  TemplateListing },
  { path: '/admin/account/accounts/edit', exact: true, name: 'Account Settings', component:  EditAccount },
  { path: '/admin/account/templatekeywords', exact: true, name: 'Template Keywords', component:  TemplateKeywordListing },
  { path: '/admin/account/templateusage', exact: true, name: 'Template Usage', component:  TemplateUsageListing },
  { path: '/admin/account/templateusagetype', exact: true, name: 'Template Usage Type', component:  TemplateUsageTypeListing },

  // { path: '/admin/test/test', exact: true, name: 'Test', component:  TestListing },


  //**********************************CRM SYSTEM************** */

  { path: '/system/crm/contacts', exact: true, name: 'Contacts', component:  CrmContactsListing },
  { path: '/system/crm/contact-person', exact: true, name: 'Contact Person', component:  CrmContactPersonListing },
  { path: '/system/crm/notes', exact: true, name: 'Notes', component:  CrmNotesListing },
  { path: '/system/crm/activity-type', exact: true, name: 'Activity Type', component:  ActivityTypeListing },
  { path: '/system/crm/note-activity', exact: true, name: 'Activities', component:  CrmNotesActivity },
  { path: '/system/crm', exact: true, name: 'CRM', component:  CrmHome },
  { path: '/system/crm/leads', exact: true, name: 'Leads', component:  CrmLeadMain },
  { path: '/system/crm/campaign-type', exact: true, name: 'Marketing Compaign Type', component:  MarketingCompaignTypeListing },
  { path: '/system/crm/marketing-campaigns', exact: true, name: 'Marketing Compaigns', component:  CrmMarketingCampainMain },
  { path: '/system/crm/marketing-list', exact: true, name: 'Marketing List', component:  MarketingList },
  { path: '/system/crm/marketing-assign', exact: true, name: 'Assign Compaign To Marketing List', component:  MarkListMapListing },
  { path: '/system/crm/marketing-member', exact: true, name: 'Marketing List Member', component:  CrmMarketingMemberList },
  { path: '/system/crm/sales-opportunity', exact: true, name: 'Sales Opportunity', component:  CrmSalesListing },



];
export default routes;
