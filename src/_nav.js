export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info"
        // text: 'NEW',
      }
    },
    {
      title: true,
      name: "Navigation",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },

    // {
    //   title: true,
    //   name: "CRM",
    //   wrapper: {
    //     // optional wrapper object
    //     element: "", // required valid HTML5 element tag
    //     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: "" // optional class names space delimited list for title item ex: "text-center"
    // },

// {
//   title: true,
//   name: "SCHEDULE",
//   wrapper: {
//     // optional wrapper object
//     element: "", // required valid HTML5 element tag
//     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//   },
//   class: "" // optional class names space delimited list for title item ex: "text-center"
// },
{
  name: "SCHEDULE",
  url: "/job",
  icon: "fa fa-clock-o",
  children: [
{
  name: 'Display',
  url: '/job/contact',
  icon: 'fa fa-clock-o',
},],
},
// {
//   title: true,
//   name: "STOCK & EQUIPMENT",
//   wrapper: {
//     // optional wrapper object
//     element: "", // required valid HTML5 element tag
//     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//   },
//   class: "" // optional class names space delimited list for title item ex: "text-center"
// },
{
  name: "STOCK & EQUIPMENT",
  url: "/job",
  icon: "fa fa-cubes",
  children: [
{
  name: 'Stock Item',
  url: '/job/item',
  icon: 'fa fa-cubes',
},],
},
{
  name: "CRM",
  url: "/crm",
  icon: "fa fa-users",
  children: [
{
  name: 'Contacts',
  url: '/crm/contact',
  icon: 'fa fa-user',
},
{
  name: 'Notes',
  url: '/crm/note',
  icon: 'fa fa-sticky-note-o',
},
{
  name: 'SALES',
  url: '/crm/sale',
  icon: 'fa fa-gbp',
},
{
  name: 'FINANCE',
  url: '/crm/document',
  icon: 'fa fa-bank',
},
{
  name: 'MAIL',
  url: '/crm/mail',
  icon: 'fa fa-envelope-open-o',
},
{
  name: 'KNOWLEDGE BASE',
  url: '/crm/knowledge',
  icon: 'fa fa-folder-open-o',
},
],
},
// {
//   title: true,
//   name: "FLEET & RESOURCES",
//   wrapper: {
//     // optional wrapper object
//     element: "", // required valid HTML5 element tag
//     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//   },
//   class: "" // optional class names space delimited list for title item ex: "text-center"
// },
{
  name: "FLEET & RESOURCES",
  url: "/fleet",
  icon: "fa fa-truck",
  children: [
{
  name: 'fleet',
  url: '/fleet/fleet',
  icon: 'fa fa-truck',
},],
},

// {
//   title: true,
//   name: "ALERTS",
//   wrapper: {
//     // optional wrapper object
//     element: "", // required valid HTML5 element tag
//     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//   },
//   class: "" // optional class names space delimited list for title item ex: "text-center"
// },
{
  name: "ALERTS",
  url: "/alert",
  icon: "fa fa-bell-o",
  children: [
{
  name: 'Alerts Raised',
  url: '/alert/raised',
  icon: 'fa fa-bell-o',
},],
},
// {
//   title: true,
//   name: "MESSAGES",
//   wrapper: {
//     // optional wrapper object
//     element: "", // required valid HTML5 element tag
//     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//   },
//   class: "" // optional class names space delimited list for title item ex: "text-center"
// },
{
  name: "MESSAGES",
  url: "/mail",
  icon: "fa fa-envelope-o",
},
// {
//   title: true,
//   name: "REPORTS",
//   wrapper: {
//     // optional wrapper object
//     element: "", // required valid HTML5 element tag
//     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//   },
//   class: "" // optional class names space delimited list for title item ex: "text-center"
// },
{
  name: "REPORTS",
  url: "/report",
  icon: "fa fa-file-pdf-o",
},

// {
//   title: true,
//   name: "MAP",
//   wrapper: {
//     // optional wrapper object
//     element: "", // required valid HTML5 element tag
//     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//   },
//   class: "" // optional class names space delimited list for title item ex: "text-center"
// },
{
  name: "MAP",
  url: "/map",
  icon: "fa fa-map-o",
},

{
  title: true,
  name: "My Account",
  wrapper: {
    // optional wrapper object
    element: "", // required valid HTML5 element tag
    attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
  },
  class: "" // optional class names space delimited list for title item ex: "text-center"
},
// {
//   name: 'Colors',
//   url: '/theme/colors',
//   icon: 'icon-drop',
// },
// {
//   name: 'Typography',
//   url: '/theme/typography',
//   icon: 'icon-pencil',
// },
{
  name: "ADMINISTRATION",
  url: "/admin",
  icon: "fa fa-user-secret",
  children: [
    {
      name: "RESOURCES",
      url: "/admin/resources",
      icon: "fa fa-user-o",
      children: [
        {
          name: "Manage",
          url: "/admin/resources/manage",
          icon: "fa fa-user-o"
        },
        {
          name: "Groups",
          url: "/admin/resources/group",
          icon: "fa fa-user-o"
        },
        {
          name: "Resource Skills",
          url: "/admin/resources/skills",
          icon: "fa fa-user-o"
        },
        {
          name: "Custom Fields",
          url: "/admin/resources/custom",
          icon: "fa fa-user-o"
        },
        {
          name: "Phone Book",
          url: "/admin/resources/phone",
          icon: "fa fa-user-o"
        },
        {
          name: "Driver Behaviour",
          url: "/admin/resources/driver",
          icon: "fa fa-user-o"
        },
        {
          name: "Absence Types",
          url: "/admin/resources/absencetype",
          icon: "fa fa-user-o"
        }
      ]
    },
    {
      name: "VEHICLES",
      url: "/admin/vehicle",
      icon: "fa fa-truck",
      children: [
        {
          name: "Manage",
          url: "/admin/vehicle/manage",
          icon: "fa fa-truck"
        },
        {
          name: "Vehicle Group",
          url: "/admin/vehicle/group",
          icon: "fa fa-truck"
        },
        {
          name: "Vehicle Type",
          url: "/admin/vehicle/type",
          icon: "fa fa-truck"
        },
        {
          name: "Vehicle Attributes",
          url: "/admin/vehicle/attribute",
          icon: "fa fa-truck"
        },
        {
          name: "Vehicle Custom Fields",
          url: "/admin/vehicle/custom",
          icon: "fa fa-truck"
        },
        {
          name: "Vehicle Check",
          url: "/admin/vehicle/check",
          icon: "fa fa-truck"
        },
        {
          name: "Vehicle Check Type",
          url: "/admin/vehicle/check/type",
          icon: "fa fa-truck"
        },
        {
          name: "Tracking Device",
          url: "/admin/vehicle/trackingdevice",
          icon: "fa fa-truck"
        },
        {
          name: "Fuel Cost",
          url: "/admin/vehicle/fuel",
          icon: "fa fa-truck"
        }
      ]
    },
    {
      name: "SCHEDULE",
      url: "/admin/schedule",
      icon: "fa fa-clock-o",
      children: [
        {
          name: "Job Type",
          url: "/admin/schedule/type",
          icon: "fa fa-clock-o"
        },
        {
          name: "Job Flags",
          url: "/admin/schedule/jobflag",
          icon: "fa fa-users"
        },
        {
          name: "Job Categories",
          url: "/admin/schedule/jobcategory",
          icon: "fa fa-clock-o"
        },
        {
          name: "Job Custom Field",
          url: "/admin/schedule/custom",
          icon: "fa fa-clock-o"
        },
        {
          name: "Job Flags",
          url: "/admin/schedule/jobflag",
          icon: "fa fa-users"
        },

        {
          name: "Work Sheet",
          url: "/admin/schedule/worksheet",
          icon: "fa fa-clock-o"
        },
        {
          name: "Job Group Template",
          url: "/admin/schedule/jobgroup",
          icon: "fa fa-clock-o"
        }
      ]
    },
    {
      name: "CONTACTS & NOTES",
      url: "/admin/contact",
      icon: "fa fa-users",
      children: [
        {
          name: "Contact Groups",
          url: "/admin/contact/group",
          icon: "fa fa-users"
        },
        {
          name: "Contact Custom Fields",
          url: "/admin/contact/custom",
          icon: "fa fa-users"
        },
        {
          name: "Person Flags",
          url: "/admin/contact/flag",
          icon: "fa fa-users"
        },
        {
          name: "Note types",
          url: "/admin/contact/type",
          icon: "fa fa-users"
        },
        {
          name: "Notes Custom Fields",
          url: "/admin/notes/custom",
          icon: "fa fa-users"
        },
        {
          name: "Note Workflows",
          url: "/admin/note/workflow",
          icon: "fa fa-users"
        },
        {
          name: "Note Flags",
          url: "/admin/note/flag",
          icon: "fa fa-users"
        },
        {
          name: "Currency",
          url: "/admin/currency",
          icon: "fa fa-users"
        },
        {
          name: "Territory Groups",
          url: "/admin/note/territory",
          icon: "fa fa-users"
        }
      ]
    },
    {
      name: "FINANCIAL",
      url: "/admin/finnance",
      icon: "fa fa-bank",
      children: [
        {
          name: "Financial documents & Sales Opps",
          url: "/admin/finance/docs",
          icon: "fa fa-bank"
        },
        {
          name: "Financial documents' custom fields",
          url: "/admin/finance/custom",
          icon: "fa fa-bank"
        },
        {
          name: "Predefined invoicing items",
          url: "/admin/finance/invoice",
          icon: "fa fa-bank"
        },
        {
          name: "Predef. invoice items' custom fields",
          url: "/admin/finance/invoice-custom",
          icon: "fa fa-bank"
        },
        {
          name: "Bank accounts",
          url: "/admin/finance/account",
          icon: "fa fa-bank"
        },
        {
          name: "Nominal codes",
          url: "/admin/finance/nominal",
          icon: "fa fa-bank"
        },
        {
          name: "Department codes",
          url: "/admin/finance/dept",
          icon: "fa fa-bank"
        },
        {
          name: "VAT codes",
          url: "/admin/finance/vat",
          icon: "fa fa-bank"
        },
        {
          name: "Sales opportunity stages",
          url: "/admin/finance/sale",
          icon: "fa fa-bank"
        },
        {
          name: "Sales opportunity probabilities",
          url: "/admin/finance/saleprob",
          icon: "fa fa-bank"
        },
        {
          name: "Sales opportunity flags",
          url: "/admin/finance/saleflag",
          icon: "fa fa-bank"
        },
        {
          name: "Door Type",
          url: "/admin/finance/doortype",
          icon: "fa fa-bank"
        },
        {
          name: "Schedule of rates",
          url: "/admin/finance/rate",
          icon: "fa fa-bank"
        },
      ]
    },
    {
      name: "STOCK & EQUIPMENT",
      url: "/admin/stocknequip",
      icon: "fa fa-bank",
    },
    {
      name: "FORMS",
      url: "/admin/form",
      icon: "fa fa-bank",
    },
    {
      name: "WEB USERS",
      url: "/admin/user",
      icon: "fa fa-bank",
    },
    {
      name: "ACCOUNT",
      url: "/admin/account",
      icon: "fa fa-bank",
    },
  ],
},
{
  name: "SETTING",
  url: "/admin/setting",
  icon: "fa fa-gears",
},
{
  name: "SIGNOUT",
  url: "/admin/signoff",
  icon: "fa fa-sign-out",
},

    //     {
    //       title: true,
    //       name: 'Components',
    //       wrapper: {
    //         element: '',
    //         attributes: {},
    //       },
    //     },
    //     {
    //       name: 'Base',
    //       url: '/base',
    //       icon: 'icon-puzzle',
    //       children: [
    //         {
    //           name: 'Breadcrumbs',
    //           url: '/base/breadcrumbs',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Cards',
    //           url: '/base/cards',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Carousel',
    //           url: '/base/carousels',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Collapse',
    //           url: '/base/collapses',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Dropdowns',
    //           url: '/base/dropdowns',
    //           icon: 'icon-puzzle'
    //         },
    //         {
    //           name: 'Jumbotrons',
    //           url: '/base/jumbotrons',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'List group',
    //           url: '/base/list-groups',
    //           icon: 'icon-puzzle',
    //         },
            // {
            //   name: 'Navs',
            //   url: '/base/navs',
            //   icon: 'icon-puzzle',
            // },
    //         {
    //           name: 'Paginations',
    //           url: '/base/paginations',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Popovers',
    //           url: '/base/popovers',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Progress Bar',
    //           url: '/base/progress-bar',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Switches',
    //           url: '/base/switches',
    //           icon: 'icon-puzzle'
    //         },
    //         {
    //           name: 'Spinners',
    //           url: '/base/spinners',
    //           icon: 'fa fa-circle-o-notch',
    //           badge: {
    //             variant: 'info',
    //             text: 'NEW',
    //           },
    //         },
    //         {
    //           name: 'Tabs',
    //           url: '/base/tabs',
    //           icon: 'icon-puzzle',
    //         },
    //         {
    //           name: 'Tooltips',
    //           url: '/base/tooltips',
    //           icon: 'icon-puzzle',
    //         },
    //       ],
    //     },
    //     {
    //       name: 'Buttons',
    //       url: '/buttons',
    //       icon: 'icon-cursor',
    //       children: [
    //         {
    //           name: 'Buttons',
    //           url: '/buttons/buttons',
    //           icon: 'icon-cursor',
    //         },
    //         {
    //           name: 'Brand Buttons',
    //           url: '/buttons/brand-buttons',
    //           icon: 'icon-cursor',
    //         },
    //         {
    //           name: 'Button groups',
    //           url: '/buttons/button-groups',
    //           icon: 'icon-cursor',
    //         },
    //         {
    //           name: 'Dropdowns',
    //           url: '/buttons/button-dropdowns',
    //           icon: 'icon-cursor',
    //         },
    //         {
    //           name: 'Loading Buttons',
    //           url: '/buttons/loading-buttons',
    //           icon: 'icon-cursor',
    //           badge: {
    //             variant: 'danger',
    //             text: 'PRO',
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       name: 'Charts',
    //       url: '/charts',
    //       icon: 'icon-pie-chart'
    //     },
    //     {
    //       name: 'Editors',
    //       url: '/editors',
    //       icon: 'fa fa-code',
    //       children: [
    //         {
    //           name: 'Code Editors',
    //           url: '/editors/code-editors',
    //           icon: 'fa fa-code',
    //           badge: {
    //             variant: 'danger',
    //             text: 'PRO',
    //           },
    //         },
    //         {
    //           name: 'Text Editors',
    //           url: '/editors/text-editors',
    //           icon: 'icon-note',
    //           badge: {
    //             variant: 'danger',
    //             text: 'PRO',
    //           },
    //         }
    //       ]
    //     },
        // {
        //   name: 'Forms',
        //   url: '/forms',
        //   icon: 'icon-note',
        //   children: [
        //     {
        //       name: 'Basic Forms',
        //       url: '/forms/basic-forms',
        //       icon: 'icon-note'
        //     },
        //     {
        //       name: 'Advanced Forms',
        //       url: '/forms/advanced-forms',
        //       icon: 'icon-note',
        //       badge: {
        //         variant: 'danger',
        //         text: 'PRO'
        //       }
        //     },
        //     {
        //       name: 'Validation',
        //       url: '/forms/validation-forms',
        //       icon: 'icon-note',
        //       badge: {
        //         variant: 'danger',
        //         text: 'PRO'
        //       }
        //     }
        //   ]
        // },
    //     {
    //       name: 'Google Maps',
    //       url: '/google-maps',
    //       icon: 'icon-map',
    //       badge: {
    //         variant: 'danger',
    //         text: 'PRO'
    //       }
    //     },
        // {
        //   name: 'Icons',
        //   url: '/icons',
        //   icon: 'icon-star',
        //   children: [
        //     {
        //       name: 'CoreUI Icons',
        //       url: '/icons/coreui-icons',
        //       icon: 'icon-star',
        //       badge: {
        //         variant: 'info',
        //         text: 'NEW',
        //       },
        //     },
        //     {
        //       name: 'Flags',
        //       url: '/icons/flags',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Font Awesome',
        //       url: '/icons/font-awesome',
        //       icon: 'icon-star',
        //       badge: {
        //         variant: 'secondary',
        //         text: '4.7',
        //       },
        //     },
        //     {
        //       name: 'Simple Line Icons',
        //       url: '/icons/simple-line-icons',
        //       icon: 'icon-star',
        //     },
        //   ],
        // },
    //     {
    //       name: 'Notifications',
    //       url: '/notifications',
    //       icon: 'icon-bell',
    //       children: [
    //         {
    //           name: 'Alerts',
    //           url: '/notifications/alerts',
    //           icon: 'icon-bell',
    //         },
    //         {
    //           name: 'Badges',
    //           url: '/notifications/badges',
    //           icon: 'icon-bell',
    //         },
            // {
            //   name: 'Modals',
            //   url: '/notifications/modals',
            //   icon: 'icon-bell'
            // },
            // {
            //   name: 'Toastr',
            //   url: '/notifications/toastr',
            //   icon: 'icon-bell',
            //   badge: {
            //     variant: 'danger',
            //     text: 'PRO'
            //   }
            // },
    //       ]
    //     },
    //     {
    //       name: 'Plugins',
    //       url: '/plugins',
    //       icon: 'icon-energy',
    //       children: [
    //         {
    //           name: 'Calendar',
    //           url: '/plugins/calendar',
    //           icon: 'icon-calendar',
    //           badge: {
    //             variant: 'danger',
    //             text: 'PRO'
    //           }
    //         },
    //         {
    //           name: 'Draggable',
    //           url: '/plugins/draggable',
    //           icon: 'icon-cursor-move',
    //           badge: {
    //             variant: 'danger',
    //             text: 'PRO'
    //           }
    //         },
    //         {
    //           name: 'Spinners',
    //           url: '/plugins/spinners',
    //           icon: 'fa fa-spinner',
    //           badge: {
    //             variant: 'danger',
    //             text: 'PRO'
    //           }
    //         }
    //       ]
    //         },
        // {
        //   name: 'Tables',
        //   url: '/tables',
        //   icon: 'icon-list',
        //   children: [
        //     {
        //       name: 'Data Table',
        //       url: '/tables/data-table',
        //       icon: 'icon-list',
        //       badge: {
        //         variant: 'danger',
        //         text: 'PRO'
        //       }
        //     },
        //     {
        //       name: 'Tables',
        //       url: '/tables/tables',
        //       icon: 'icon-list'
        //     }
        //   ]
        // },
    //     {
    //       name: 'Widgets',
    //       url: '/widgets',
    //       icon: 'icon-calculator',
    //       badge: {
    //         variant: 'info',
    //         text: 'NEW',
    //       },
    //     },
    //     {
    //       divider: true,
    //     },
    //     {
    //       title: true,
    //       name: 'Extras',
    //     },
    //     {
    //       name: 'Pages',
    //       url: '/pages',
    //       icon: 'icon-star',
    //       children: [
    //         {
    //           name: 'Login',
    //           url: '/login',
    //           icon: 'icon-star',
    //         },
    //         {
    //           name: 'Register',
    //           url: '/register',
    //           icon: 'icon-star',
    //         },
    //         {
    //           name: 'Error 404',
    //           url: '/404',
    //           icon: 'icon-star',
    //         },
    //         {
    //           name: 'Error 500',
    //           url: '/500',
    //           icon: 'icon-star',
    //         },
    //       ],
    //     },
    //     {
    //       name: 'Disabled',
    //       url: '/dashboard',
    //       icon: 'icon-ban',
    //       badge: {
    //         variant: 'secondary',
    //         text: 'NEW',
    //       },
    //       attributes: { disabled: true },
    //     },
    //     {
    //       name: 'Apps',
    //       url: '/apps',
    //       icon: 'icon-layers',
    //       children: [
    //         {
    //           name: 'Invoicing',
    //           url: '/apps/invoicing',
    //           icon: 'icon-speech',
    //           children: [
    //             {
    //               name: 'Invoice',
    //               url: '/apps/invoicing/invoice',
    //               icon: 'icon-speech',
    //               badge: {
    //                 variant: 'danger',
    //                 text: 'PRO'
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           name: 'Email',
    //           url: '/apps/email',
    //           icon: 'icon-speech',
    //           children: [
    //             {
    //               name: 'Inbox',
    //               url: '/apps/email/inbox',
    //               icon: 'icon-speech',
    //               badge: {
    //                 variant: 'danger',
    //                 text: 'PRO',
    //               },
    //             },
    //             {
    //               name: 'Message',
    //               url: '/apps/email/message',
    //               icon: 'icon-speech',
    //               badge: {
    //                 variant: 'danger',
    //                 text: 'PRO',
    //               },
    //             },
    //             {
    //               name: 'Compose',
    //               url: '/apps/email/compose',
    //               icon: 'icon-speech',
    //               badge: {
    //                 variant: 'danger',
    //                 text: 'PRO',
    //               },
    //             },
    //           ],
    //         },
    //       ]
    //     },
    //     {
    //       divider: true,
    //       class: 'm-2'
    //     },
    //     {
    //       title: true,
    //       name: 'Labels'
    //     },
    //     {
    //       name: 'Label danger',
    //       url: '',
    //       icon: 'fa fa-circle',
    //       label: {
    //         variant: 'danger'
    //       },
    //     },
    //     {
    //       name: 'Label info',
    //       url: '',
    //       icon: 'fa fa-circle',
    //       label: {
    //         variant: 'info'
    //       }
    //     },
    //     {
    //       name: 'Label warning',
    //       url: '',
    //       icon: 'fa fa-circle',
    //       label: {
    //         variant: 'warning'
    //       }
    //     },
  ]
};
