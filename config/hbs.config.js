const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));



hbs.registerHelper('isAdmin', function (options) {
  const { role } = options.hash;

  if (role === 'ADMIN') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})


hbs.registerHelper('isUser', function (options) {
  const { role } = options.hash;

  if (role === 'USER') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})


// {{#isAdmin role=user.role mas=mas masaun=masaun}}

// {{/isAdmin}}}

hbs.registerHelper('formatDate', (date) => {
  const toDate = new Date(date)

  let day = toDate.getDate()
  let month = toDate.getMonth() + 1
  let year = toDate.getFullYear()

  if (month < 10) {
    return `${day}-0${month}-${year}`
  } else {
    return `${day}-${month}-${year}`
  }
})