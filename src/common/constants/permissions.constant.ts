// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
// Run `npm run gen:permissions` to regenerate.

export const PERMISSION = {
  USERS: {
    /** Create new user accounts and assign roles */
    CREATE: 'users.create',
    /** Modify user information, credentials, or role assignments */
    UPDATE: 'users.update',
    /** Soft-delete or disable user accounts */
    DELETE: 'users.delete',
    /** View user profiles, roles, and account information */
    VIEW: 'users.view',
  },
  ROLES: {
    /** Create new roles with specific access levels */
    CREATE: 'roles.create',
    /** Modify an existing role’s name or access scope */
    UPDATE: 'roles.update',
    /** Delete or disable role definitions */
    DELETE: 'roles.delete',
    /** View the list of roles and their assigned permissions */
    VIEW: 'roles.view',
  },
  PERMISSIONS: {
    /** Create new access control permissions */
    CREATE: 'permissions.create',
    /** Modify permission names or descriptions */
    UPDATE: 'permissions.update',
    /** Remove unused or deprecated permissions */
    DELETE: 'permissions.delete',
    /** View all system permissions and their metadata */
    VIEW: 'permissions.view',
  },
  MOVIES: {
    /** Add a new movie with details, poster, and metadata */
    CREATE: 'movies.create',
    /** Edit movie details, status, images, or metadata */
    UPDATE: 'movies.update',
    /** Soft-delete or deactivate a movie */
    DELETE: 'movies.delete',
    /** View movie information and metadata */
    VIEW: 'movies.view',
  },
  MOVIESTATUSES: {
    /** View available movie lifecycle statuses */
    VIEW: 'movieStatuses.view',
  },
  MOVIERATINGS: {
    /** View official movie content rating categories */
    VIEW: 'movieRatings.view',
  },
  GENRES: {
    /** Add new movie genre categories */
    CREATE: 'genres.create',
    /** Modify existing movie genres */
    UPDATE: 'genres.update',
    /** Remove unused movie genres */
    DELETE: 'genres.delete',
    /** View movie genres */
    VIEW: 'genres.view',
  },
  CINEMAS: {
    /** Add a new cinema location including branding */
    CREATE: 'cinemas.create',
    /** Edit cinema details such as name or logo */
    UPDATE: 'cinemas.update',
    /** Deactivate or remove a cinema branch */
    DELETE: 'cinemas.delete',
    /** View cinema locations and their metadata */
    VIEW: 'cinemas.view',
  },
  THEATERS: {
    /** Add a new theater inside a cinema */
    CREATE: 'theaters.create',
    /** Edit theater details like name or address */
    UPDATE: 'theaters.update',
    /** Deactivate a theater */
    DELETE: 'theaters.delete',
    /** View theaters under each cinema */
    VIEW: 'theaters.view',
  },
  STUDIOS: {
    /** Add a studio room to a theater */
    CREATE: 'studios.create',
    /** Modify studio details */
    UPDATE: 'studios.update',
    /** Remove or deactivate a studio room */
    DELETE: 'studios.delete',
    /** View studio rooms inside theaters */
    VIEW: 'studios.view',
  },
  SEATS: {
    /** Add new seats (row/number) to a studio layout */
    CREATE: 'seats.create',
    /** Modify seat mapping and layout */
    UPDATE: 'seats.update',
    /** Deactivate seats from a layout */
    DELETE: 'seats.delete',
    /** View seat layout for studios */
    VIEW: 'seats.view',
  },
  SEATTYPES: {
    /** Create new seat type categories */
    CREATE: 'seatTypes.create',
    /** Modify seat type names or attributes */
    UPDATE: 'seatTypes.update',
    /** Remove unused seat types */
    DELETE: 'seatTypes.delete',
    /** View available seat types */
    VIEW: 'seatTypes.view',
  },
  SEATPRICINGS: {
    /** Define base seat pricing for weekdays/weekends */
    CREATE: 'seatPricings.create',
    /** Modify base pricing rules */
    UPDATE: 'seatPricings.update',
    /** Remove pricing definitions */
    DELETE: 'seatPricings.delete',
    /** View base pricing rules */
    VIEW: 'seatPricings.view',
  },
  SEATPRICINGOVERRIDES: {
    /** Create pricing overrides for specific movies */
    CREATE: 'seatPricingOverrides.create',
    /** Modify override pricing rules */
    UPDATE: 'seatPricingOverrides.update',
    /** Remove override pricing configurations */
    DELETE: 'seatPricingOverrides.delete',
    /** View override pricing rules */
    VIEW: 'seatPricingOverrides.view',
  },
  SHOWTIMES: {
    /** Schedule a new showtime for a movie */
    CREATE: 'showtimes.create',
    /** Modify showtime schedule or studio assignment */
    UPDATE: 'showtimes.update',
    /** Deactivate or delete a scheduled showtime */
    DELETE: 'showtimes.delete',
    /** View scheduled showtimes and availability */
    VIEW: 'showtimes.view',
    /** Activate a showtime and make it bookable */
    PUBLISH: 'showtimes.publish',
    /** Disable a showtime and remove from booking */
    UNPUBLISH: 'showtimes.unpublish',
  },
  TRANSACTIONS: {
    /** View transaction details and order history */
    VIEW: 'transactions.view',
    /** Process refunds for valid or failed transactions */
    REFUND: 'transactions.refund',
    /** Create or adjust transactions (POS mode) */
    MANAGE: 'transactions.manage',
  },
  PAYMENTS: {
    /** View available payment methods */
    VIEW: 'payments.view',
    /** Enable, disable, or configure available payment methods */
    MANAGE: 'payments.manage',
  },
  REPORTS: {
    /** View dashboards, charts, and key performance statistics */
    VIEW: 'reports.view',
    /** Export reports to CSV or PDF */
    EXPORT: 'reports.export',
  },
} as const;

export type PermissionKey = {
  [M in keyof typeof PERMISSION]: (typeof PERMISSION)[M][keyof (typeof PERMISSION)[M]];
}[keyof typeof PERMISSION];
