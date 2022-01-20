const baseApiUrl = import.meta.env.VITE_BASE_URL as string;

enum filterIds {
  RECORDS = 'audiocontrol_filter/RECORDS',
  MODERATES = 'audiocontrol_filter/MODERATES',
}
enum rolesIds {
  SuperAdmin = 1,
  Admin = 2,
  ChiefAuditExecutive = 3,
  Supervisor = 4,
  Moderator = 5,
  Hostess = 6,
  User = 7,
}

// нужно для того чтобы модераторы видели только свои отъмодерированые записи
const roleAccessLevel = {
  1: 'Can view all',
  2: 'Can view own cabinet',
  3: 'Can view self records',
};
const accessLevelOptions = Object.entries(roleAccessLevel).map(
  (role) => ({ value: role[0].toString(), label: role[1].toString() }),
);

export { accessLevelOptions, baseApiUrl, filterIds, roleAccessLevel, rolesIds };
