// prisma/seeders/modules.ts

export const modules = {
  //
  // SYSTEM MANAGEMENT
  //
  users: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'System user accounts including admins, staff, and customers',
    actionDescriptions: {
      create: 'Create new user accounts and assign roles',
      update: 'Modify user information, credentials, or role assignments',
      delete: 'Soft-delete or disable user accounts',
      view: 'View user profiles, roles, and account information',
    },
  },

  roles: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Role definitions and access levels inside the system',
    actionDescriptions: {
      create: 'Create new roles with specific access levels',
      update: 'Modify an existing role’s name or access scope',
      delete: 'Delete or disable role definitions',
      view: 'View the list of roles and their assigned permissions',
    },
  },

  permissions: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'System access permissions used for RBAC',
    actionDescriptions: {
      create: 'Create new access control permissions',
      update: 'Modify permission names or descriptions',
      delete: 'Remove unused or deprecated permissions',
      view: 'View all system permissions and their metadata',
    },
  },

  //
  // MOVIES
  //
  movies: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Movies available for booking including metadata and images',
    actionDescriptions: {
      create: 'Add a new movie with details, poster, and metadata',
      update: 'Edit movie details, status, images, or metadata',
      delete: 'Soft-delete or deactivate a movie',
      view: 'View movie information and metadata',
    },
  },

  movieStatuses: {
    actions: ['view'],
    description: 'Movie lifecycle status lookup values',
    actionDescriptions: {
      view: 'View available movie lifecycle statuses',
    },
  },

  movieRatings: {
    actions: ['view'],
    description: 'Movie content rating categories (PG, R, etc.)',
    actionDescriptions: {
      view: 'View official movie content rating categories',
    },
  },

  genres: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Movie genre categories',
    actionDescriptions: {
      create: 'Add new movie genre categories',
      update: 'Modify existing movie genres',
      delete: 'Remove unused movie genres',
      view: 'View movie genres',
    },
  },

  //
  // CINEMA STRUCTURE
  //
  cinemas: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Cinema branches and location data',
    actionDescriptions: {
      create: 'Add a new cinema location including branding',
      update: 'Edit cinema details such as name or logo',
      delete: 'Deactivate or remove a cinema branch',
      view: 'View cinema locations and their metadata',
    },
  },

  theaters: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Theaters inside a cinema building',
    actionDescriptions: {
      create: 'Add a new theater inside a cinema',
      update: 'Edit theater details like name or address',
      delete: 'Deactivate a theater',
      view: 'View theaters under each cinema',
    },
  },

  studios: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Studio rooms inside theaters',
    actionDescriptions: {
      create: 'Add a studio room to a theater',
      update: 'Modify studio details',
      delete: 'Remove or deactivate a studio room',
      view: 'View studio rooms inside theaters',
    },
  },

  //
  // SEATS
  //
  seats: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Seat layout and configuration in studios',
    actionDescriptions: {
      create: 'Add new seats (row/number) to a studio layout',
      update: 'Modify seat mapping and layout',
      delete: 'Deactivate seats from a layout',
      view: 'View seat layout for studios',
    },
  },

  seatTypes: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Seat type definitions (VIP, Regular, etc.)',
    actionDescriptions: {
      create: 'Create new seat type categories',
      update: 'Modify seat type names or attributes',
      delete: 'Remove unused seat types',
      view: 'View available seat types',
    },
  },

  seatPricings: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Base pricing rules per seat type and day type',
    actionDescriptions: {
      create: 'Define base seat pricing for weekdays/weekends',
      update: 'Modify base pricing rules',
      delete: 'Remove pricing definitions',
      view: 'View base pricing rules',
    },
  },

  seatPricingOverrides: {
    actions: ['create', 'update', 'delete', 'view'],
    description: 'Movie-specific seat pricing overrides',
    actionDescriptions: {
      create: 'Create pricing overrides for specific movies',
      update: 'Modify override pricing rules',
      delete: 'Remove override pricing configurations',
      view: 'View override pricing rules',
    },
  },

  //
  // SHOWTIMES
  //
  showtimes: {
    actions: ['create', 'update', 'delete', 'view', 'publish', 'unpublish'],
    description: 'Movie showtimes scheduling and management',
    actionDescriptions: {
      create: 'Schedule a new showtime for a movie',
      update: 'Modify showtime schedule or studio assignment',
      delete: 'Deactivate or delete a scheduled showtime',
      view: 'View scheduled showtimes and availability',
      publish: 'Activate a showtime and make it bookable',
      unpublish: 'Disable a showtime and remove from booking',
    },
  },

  //
  // TRANSACTIONS AND PAYMENTS
  //
  transactions: {
    actions: ['view', 'refund', 'manage'],
    description: 'Customer transactions and ticket purchases',
    actionDescriptions: {
      view: 'View transaction details and order history',
      refund: 'Process refunds for valid or failed transactions',
      manage: 'Create or adjust transactions (POS mode)',
    },
  },

  payments: {
    actions: ['view', 'manage'],
    description: 'Payment method configuration',
    actionDescriptions: {
      view: 'View available payment methods',
      manage: 'Enable, disable, or configure available payment methods',
    },
  },

  //
  // REPORTING
  //
  reports: {
    actions: ['view', 'export'],
    description: 'Analytics and operational reporting',
    actionDescriptions: {
      view: 'View dashboards, charts, and key performance statistics',
      export: 'Export reports to CSV or PDF',
    },
  },
};
