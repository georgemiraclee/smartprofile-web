// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {

    printWidth: 80,
    semi: true,
    tabWidth: 4,
    trailingComma: 'all',

    plugins: ['@ianvs/prettier-plugin-sort-imports'],
    importOrder: [
        '',
        '^(react/(.*)$)|^(react$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@/types(/.*)?$',
        '^@/config(/.*)?$',
        '^@/constants(/.*)?$',
        '^@/utils(/.*)?$',
        '^@/schemas(/.*)?$',
        '^@/services(/.*)?$',
        '^@/components(.*)$',
        '^@/views(.*)$',
        '',
        '^[.]',
    ],
};
