
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  major: 'major',
  targetJob: 'targetJob',
  skills: 'skills',
  role: 'role',
  companyName: 'companyName',
  companyDesc: 'companyDesc',
  isApproved: 'isApproved',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PortfolioScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  description: 'description',
  techStack: 'techStack',
  startDate: 'startDate',
  endDate: 'endDate',
  githubUrl: 'githubUrl',
  deployUrl: 'deployUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobPostingScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  company: 'company',
  position: 'position',
  url: 'url',
  deadline: 'deadline',
  interviewAt: 'interviewAt',
  status: 'status',
  contacts: 'contacts',
  followUpAt: 'followUpAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StatusHistoryScalarFieldEnum = {
  id: 'id',
  jobId: 'jobId',
  status: 'status',
  changedAt: 'changedAt',
  note: 'note'
};

exports.Prisma.RoadmapItemScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  jobCategory: 'jobCategory',
  skill: 'skill',
  status: 'status',
  referenceLinks: 'referenceLinks',
  isCustom: 'isCustom',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InterviewQuestionScalarFieldEnum = {
  id: 'id',
  category: 'category',
  jobType: 'jobType',
  question: 'question',
  isDefault: 'isDefault',
  userId: 'userId'
};

exports.Prisma.InterviewAnswerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  questionId: 'questionId',
  answer: 'answer',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CoverLetterScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  jobId: 'jobId',
  company: 'company',
  position: 'position',
  items: 'items',
  version: 'version',
  analysisScore: 'analysisScore',
  analysisHistory: 'analysisHistory',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CoverLetterVersionScalarFieldEnum = {
  id: 'id',
  coverLetterId: 'coverLetterId',
  version: 'version',
  items: 'items',
  savedAt: 'savedAt'
};

exports.Prisma.JobListingScalarFieldEnum = {
  id: 'id',
  company: 'company',
  position: 'position',
  location: 'location',
  career: 'career',
  education: 'education',
  employType: 'employType',
  salary: 'salary',
  deadline: 'deadline',
  url: 'url',
  description: 'description',
  tags: 'tags',
  source: 'source',
  isActive: 'isActive',
  recruiterId: 'recruiterId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobBookmarkScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  listingId: 'listingId',
  createdAt: 'createdAt'
};

exports.Prisma.EmploymentRecordScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  company: 'company',
  position: 'position',
  employType: 'employType',
  startDate: 'startDate',
  salary: 'salary',
  note: 'note',
  confirmedAt: 'confirmedAt',
  createdAt: 'createdAt'
};

exports.Prisma.NoticeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  isPinned: 'isPinned',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserNotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  body: 'body',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expiresAt: 'expiresAt',
  used: 'used',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Portfolio: 'Portfolio',
  JobPosting: 'JobPosting',
  StatusHistory: 'StatusHistory',
  RoadmapItem: 'RoadmapItem',
  InterviewQuestion: 'InterviewQuestion',
  InterviewAnswer: 'InterviewAnswer',
  CoverLetter: 'CoverLetter',
  CoverLetterVersion: 'CoverLetterVersion',
  JobListing: 'JobListing',
  JobBookmark: 'JobBookmark',
  EmploymentRecord: 'EmploymentRecord',
  Notice: 'Notice',
  UserNotification: 'UserNotification',
  PasswordResetToken: 'PasswordResetToken'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
