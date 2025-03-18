export const CONFIG = {
  isDevelopment: process.env.REACT_APP_ENV === 'development',
  ACCOUNTS_API: process.env.REACT_APP_ACCOUNTS_API || '',
  LOCATIONS_API: process.env.REACT_APP_LOCATIONS_API || '',
  INVENTORY: process.env.REACT_APP_INVENTORY_API || '',
  USERS_API: process.env.REACT_APP_USERS_API || '',
  GROUPS_API: process.env.REACT_APP_GROUPS_API || '',
  ACTIVITIES_API: process.env.REACT_APP_ACTIVITIES_API || '',
  ORDERS_API: process.env.REACT_APP_ORDERS_API || '',
  JOBS_API: process.env.REACT_APP_JOBS_API || '',
  ONBOARDING_API: process.env.REACT_APP_ONBOARDING_API || '',
  OTP_API: process.env.REACT_APP_OTP_API || '',
  INTEGRATIONS_API: process.env.REACT_APP_INTEGRATIONS_API || '',

  ORDERS_CSV_TEMPLATE_LINK: process.env.REACT_APP_ORDERS_CSV_TEMPLATE_LINK || '',
  LOCATIONS_CSV_TEMPLATE_LINK: process.env.REACT_APP_LOCATIONS_CSV_TEMPLATE_LINK || '',
  SHOPIFY_CLIENT_ID: process.env.REACT_APP_SHOPIFY_CLIENT_ID || '',
  SHOPIFY_REDIRECT_URI: process.env.REACT_APP_SHOPIFY_REDIRECT_URI || '',
  SHOPIFY_CLIENT_SECRET: process.env.REACT_APP_SHOPIFY_CLIENT_SECRET || '',
};

// LOCAL ENVIRONMENT
// export const CONFIG = {
//   isDevelopment: process.env.ENV === 'development',
//   ACCOUNTS_API:
//     process.env.REACT_APP_ACCOUNTS_API || 'https://amplsxr1gc.execute-api.eu-west-2.amazonaws.com/test/accounts',

//   LOCATIONS_API:
//     process.env.REACT_APP_LOCATIONS_API || 'https://avuang8ulb.execute-api.eu-west-2.amazonaws.com/test/locations',
//   INVENTORY:
//     process.env.REACT_APP_INVENTORY_API || 'https://03fgqnfw8e.execute-api.eu-west-2.amazonaws.com/test/inventory',
//   USERS_API: 'https://lpm6nc76ek.execute-api.eu-west-2.amazonaws.com/test/users',
//   GROUPS_API: process.env.REACT_APP_GROUPS_API || 'https://w53piguah1.execute-api.eu-west-2.amazonaws.com/test/groups',
//   ACTIVITIES_API:
//     process.env.REACT_APP_ACTIVITIES_API || 'https://3bh54qiwji.execute-api.eu-west-2.amazonaws.com/test/activities',
//   ORDERS_API: process.env.REACT_APP_ORDERS_API || 'https://jhtees1489.execute-api.eu-west-2.amazonaws.com/test/orders',
//   JOBS_API: process.env.REACT_APP_JOBS_API || 'https://s7f5ias1m9.execute-api.eu-west-2.amazonaws.com/test/jobs',
//   ONBOARDING_API:
//     process.env.REACT_APP_ONBOARDING_API || 'https://uta8ovkd70.execute-api.eu-west-2.amazonaws.com/test/onboarding',
//   OTP_API: process.env.REACT_APP_OTP_API || 'https://uta8ovkd70.execute-api.eu-west-2.amazonaws.com/test/onboarding',
//   INTEGRATIONS_API:
//     process.env.REACT_APP_INTEGRATIONS_API ||
//     'https://mxgch2hma2.execute-api.eu-west-2.amazonaws.com/test/integrations/ecom',

//   ORDERS_CSV_TEMPLATE_LINK:
//     process.env.REACT_APP_ORDERS_CSV_TEMPLATE_LINK ||
//     'https://test-mercury-uploads.s3.eu-west-2.amazonaws.com/orders/templates/202401_orders_template.csv',

//   LOCATIONS_CSV_TEMPLATE_LINK:
//     process.env.REACT_APP_LOCATIONS_CSV_TEMPLATE_LINK ||
//     'https://test-mercury-uploads.s3.eu-west-2.amazonaws.com/locations/templates/241031_locations_template.csv',

// SHOPIFY_CLIENT_ID: process.env.REACT_APP_SHOPIFY_CLIENT_ID || '',
// SHOPIFY_REDIRECT_URI: process.env.REACT_APP_SHOPIFY_REDIRECT_URI || '',
// };
