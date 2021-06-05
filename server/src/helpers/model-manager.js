const lodash = require('lodash');
const fs = require('fs');
const path = require('path');
const pandas = require('pandas-js');
const PdfMaker = require('pdfmake');

const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique',
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic',
  },
  Symbol: {
    normal: 'Symbol',
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats',
  },
};

const pdfMaker = new PdfMaker(fonts);

function incrementCode(code) {
  let __code = lodash.times(code.length, function (i) {
    return code.toUpperCase().charCodeAt(i);
  });
  for (let i = __code.length - 1; i >= 0; i--) {
    if (__code[i] + 1 == 58) {
      __code[i] = 48;
    } else if (__code[i] + 1 == 91) {
      __code[i] = 65;
    } else {
      __code[i] += 1;
      break;
    }
  }
  return String.fromCharCode(...__code);
}

function createPdfContent(documents) {
  const data = new pandas.DataFrame(documents);
  const headers = data.columns;
  const values = data.values;
  const content = {
    header: {
      columns: [
        {
          text: `${lodash.startCase(Model.modelName)} Data`,
          alignment: 'left',
        },
        {
          text: `Generated on ${timestamp.toLocaleString('en-US', { timeZone: 'UTC' })}`,
          alignment: 'right',
        },
      ],
    },
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          widths: lodash.times(headers.length, () => 'auto'),
          body: [headers, ...values],
        },
      },
    ],
    defaultStyle: {
      font: 'Helvetica',
    },
    footer: function (currentPage, pageCount) {
      return currentPage.toString() + ' of ' + pageCount;
    },
  };
  return content;
}

async function getDocuments({
  model: Model,
  pagination = {},
  orderBy = 'createdAt',
  order = 'descending',
  filter = {},
  search, // search parameters
  fields = [],
  dateRange,
  dateField = 'createdAt',
  searchFields,
  populate = '',
}) {
  return new Promise(async function (resolve, reject) {
    if (search) {
      filter['$or'] = lodash.map(searchFields, function (field) {
        return {
          [field]: new RegExp(search, 'i'),
        };
      });
    }
    if (dateRange) {
      filter[dateField] = {
        $gte: new Date(new Date(dateRange.startDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(dateRange.startDate).setHours(23, 59, 59, 999)),
      };
    }
    await Model.find(filter)
      .sort({ [orderBy]: order })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .populate(populate)
      .select(fields.join(' '))
      .then(resolve)
      .catch(reject);
  });
}

async function countDocuments({
  model: Model,
  filter = {},
  search, // search parameters
  dateRange,
  dateField = 'createdAt',
  searchFields,
}) {
  return new Promise(async function (resolve, reject) {
    if (search) {
      filter['$or'] = lodash.map(searchFields, function (field) {
        return {
          [field]: new RegExp(search, 'i'),
        };
      });
    }
    if (dateRange) {
      filter[dateField] = {
        $gte: new Date(new Date(dateRange.startDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(dateRange.startDate).setHours(23, 59, 59, 999)),
      };
    }
    await Model.countDocuments(filter).then(resolve).catch(reject);
  });
}

async function generateCode({
  model: Model,
  field = 'code',
  format, // format for code
}) {
  return new Promise(async function (resolve, reject) {
    await Model.findOne()
      .sort({ createdAt: -1 })
      .then(function (document) {
        const code = document ? incrementCode(document[field]) : format;
        resolve(code);
      })
      .catch(reject);
  });
}

function generateDocumentName(prefix, timestamp, format) {
  return `${prefix}-${lodash.padStart(timestamp.getFullYear(), 4, '0')}${lodash.padStart(
    timestamp.getMonth() + 1,
    2,
    '0',
  )}${lodash.padStart(timestamp.getDate(), 2, '0')}${lodash.padStart(
    timestamp.getHours(),
    2,
    '0',
  )}${lodash.padStart(timestamp.getMinutes(), 2, '0')}${lodash.padStart(
    timestamp.getSeconds(),
    2,
    '0',
  )}.${format}`;
}

async function generateDocument({
  model: Model,
  filter = {},
  orderBy = 'createdAt',
  order = 'descending',
  dateRange,
  dateField = 'createdAt',
  fields = [], // default all fields would be added
  format = 'csv', // pdf or csv or xlsx
}) {
  return new Promise(async function (resolve, reject) {
    const tempFolder = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempFolder)) {
      fs.mkdir(tempFolder).catch(reject);
    }
    const timestamp = new Date();
    const fileName = generateDocumentName(Model.modelName, timestamp, format);
    if (dateRange) {
      filter[dateField] = {
        $gte: new Date(new Date(dateRange.startDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(dateRange.startDate).setHours(23, 59, 59, 999)),
      };
    }
    await Model.find(filter)
      .sort({ [orderBy]: order })
      .select(fields.join(' ') + '-_id -__v -password -updatedAt')
      .then(function (documents) {
        switch (format) {
          case 'pdf': {
            const content = createPdfContent(documents);
            const workbook = pdfMaker.createPdfKitDocument(content);
            workbook.pipe(fs.createWriteStream(path.join(tempFolder, fileName)));
            workbook.end();
            resolve(fileName);
          }
          case 'csv': {
            const content = new pandas.DataFrame(documents);
            const workbook = content.to_csv(path.join(tempFolder, fileName));
            resolve(fileName);
          }
          case 'xlsx': {
            const content = new pandas.DataFrame(documents);
            const workbook = content.to_excel(path.join(tempFolder, fileName));
            resolve(fileName);
          }
        }
      })
      .catch(reject);
  });
}

module.exports = {
  getDocuments,
  countDocuments,
  generateCode,
  generateDocument,
  incrementCode,
};
