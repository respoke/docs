var respoke = new Respoke();

respoke.auth.admin({
    username: username,
    password: password
}).then(function () {
    return respoke.apps.get();
}).then(function (app) {
    console.log('Apps retrieved: ', app);
}).catch(function (error) {
    console.log(error);
});

/*
App retrieved:  [
  { id: '02ce2756-5684-4424-9770-657481bf552f',
    accountId: '9628FFD0-54E8-402C-A979-368B03EC63D9',
    name: 'local-apollo',
    description: 'Test app to run Apollo example app locally.',
    locked: false,
    permittedDomains: null,
    developmentMode: false,
    secret: '<redacted>',
    createdAt: '2014-11-06T16:58:05.000Z',
    updatedAt: '2014-11-06T16:59:16.000Z' },
  { id: '0dfcfe78-c4af-497f-88f6-c6b3a8151fb3',
    accountId: '9628FFD0-54E8-402C-A979-368B03EC63D9',
    name: 'node-respoke-testing',
    description: 'App for testing the node-respoke client.',
    locked: false,
    permittedDomains: null,
    developmentMode: false,
    secret: '<redacted>',
    createdAt: '2014-10-03T16:12:37.000Z',
    updatedAt: '2014-10-03T19:30:06.000Z' },
  { id: '2e5f9f86-807c-4dc6-922b-4a8d396808f8',
    accountId: '9628FFD0-54E8-402C-A979-368B03EC63D9',
    name: 'New App',
    description: 'New app description.',
    locked: false,
    permittedDomains: null,
    developmentMode: false,
    secret: '<redacted>',
    createdAt: '2014-12-12T16:44:35.000Z',
    updatedAt: '2014-12-12T16:44:35.000Z' },
  { id: '511b443f-3890-4a89-8740-de42f85765ef',
    accountId: '9628FFD0-54E8-402C-A979-368B03EC63D9',
    name: 'docs-example-runner',
    description: 'App for running docs examples.',
    locked: false,
    permittedDomains: null,
    developmentMode: false,
    secret: '<redacted>',
    createdAt: '2014-12-03T21:12:59.000Z',
    updatedAt: '2014-12-03T21:35:35.000Z' }
]
*/
