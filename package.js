Package.describe({
    name: 'jandres:js-combinatorics',
    version: '0.5.5',
    // Brief, one-line summary of the package.
    summary: 'power set, combination, permutation and more in JavaScript',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/dankogai/js-combinatorics.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.addFiles([
        'combinatorics.js'
    ]);
});
