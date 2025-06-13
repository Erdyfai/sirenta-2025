var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _answers = require("./answers");
var _choices = require("./choices");
var _faq = require("./faq");
var _jury_group_members = require("./jury_group_members");
var _jury_groups = require("./jury_groups");
var _question_banks = require("./question_banks");
var _questions = require("./questions");
var _recruitment_sessions = require("./recruitment_sessions");
var _registrations = require("./registrations");
var _session_questions = require("./session_questions");
var _stage_infos = require("./stage_infos");
var _stage_judgers = require("./stage_judgers");
var _stage_scores = require("./stage_scores");
var _stages = require("./stages");
var _ue_group_members = require("./ue_group_members");
var _ue_groups = require("./ue_groups");
var _user_progress = require("./user_progress");
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var answers = _answers(sequelize, DataTypes);
  var choices = _choices(sequelize, DataTypes);
  var faq = _faq(sequelize, DataTypes);
  var jury_group_members = _jury_group_members(sequelize, DataTypes);
  var jury_groups = _jury_groups(sequelize, DataTypes);
  var question_banks = _question_banks(sequelize, DataTypes);
  var questions = _questions(sequelize, DataTypes);
  var recruitment_sessions = _recruitment_sessions(sequelize, DataTypes);
  var registrations = _registrations(sequelize, DataTypes);
  var session_questions = _session_questions(sequelize, DataTypes);
  var stage_infos = _stage_infos(sequelize, DataTypes);
  var stage_judgers = _stage_judgers(sequelize, DataTypes);
  var stage_scores = _stage_scores(sequelize, DataTypes);
  var stages = _stages(sequelize, DataTypes);
  var ue_group_members = _ue_group_members(sequelize, DataTypes);
  var ue_groups = _ue_groups(sequelize, DataTypes);
  var user_progress = _user_progress(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  jury_group_members.belongsTo(jury_groups, { as: "group", foreignKey: "group_id"});
  jury_groups.hasMany(jury_group_members, { as: "jury_group_members", foreignKey: "group_id"});
  questions.belongsTo(question_banks, { as: "bank", foreignKey: "bank_id"});
  question_banks.hasMany(questions, { as: "questions", foreignKey: "bank_id"});
  answers.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(answers, { as: "answers", foreignKey: "question_id"});
  choices.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(choices, { as: "choices", foreignKey: "question_id"});
  session_questions.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(session_questions, { as: "session_questions", foreignKey: "question_id"});
  answers.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(answers, { as: "answers", foreignKey: "session_id"});
  jury_group_members.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(jury_group_members, { as: "jury_group_members", foreignKey: "session_id"});
  jury_groups.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(jury_groups, { as: "jury_groups", foreignKey: "session_id"});
  registrations.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(registrations, { as: "registrations", foreignKey: "session_id"});
  session_questions.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(session_questions, { as: "session_questions", foreignKey: "session_id"});
  stage_judgers.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(stage_judgers, { as: "stage_judgers", foreignKey: "session_id"});
  stage_scores.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(stage_scores, { as: "stage_scores", foreignKey: "session_id"});
  stages.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(stages, { as: "stages", foreignKey: "session_id"});
  ue_group_members.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(ue_group_members, { as: "ue_group_members", foreignKey: "session_id"});
  ue_groups.belongsTo(recruitment_sessions, { as: "session", foreignKey: "session_id"});
  recruitment_sessions.hasMany(ue_groups, { as: "ue_groups", foreignKey: "session_id"});
  stage_infos.belongsTo(stages, { as: "stage", foreignKey: "stage_id"});
  stages.hasMany(stage_infos, { as: "stage_infos", foreignKey: "stage_id"});
  stage_judgers.belongsTo(stages, { as: "stage", foreignKey: "stage_id"});
  stages.hasMany(stage_judgers, { as: "stage_judgers", foreignKey: "stage_id"});
  stage_scores.belongsTo(stages, { as: "stage", foreignKey: "stage_id"});
  stages.hasMany(stage_scores, { as: "stage_scores", foreignKey: "stage_id"});
  user_progress.belongsTo(stages, { as: "stage", foreignKey: "stage_id"});
  stages.hasMany(user_progress, { as: "user_progresses", foreignKey: "stage_id"});
  ue_group_members.belongsTo(ue_groups, { as: "group", foreignKey: "group_id"});
  ue_groups.hasMany(ue_group_members, { as: "ue_group_members", foreignKey: "group_id"});
  answers.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(answers, { as: "answers", foreignKey: "user_id"});
  jury_group_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(jury_group_members, { as: "jury_group_members", foreignKey: "user_id"});
  question_banks.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(question_banks, { as: "question_banks", foreignKey: "created_by"});
  registrations.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(registrations, { as: "registrations", foreignKey: "user_id"});
  session_questions.belongsTo(users, { as: "assigned_by_user", foreignKey: "assigned_by"});
  users.hasMany(session_questions, { as: "session_questions", foreignKey: "assigned_by"});
  stage_judgers.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(stage_judgers, { as: "stage_judgers", foreignKey: "user_id"});
  stage_scores.belongsTo(users, { as: "participant", foreignKey: "participant_id"});
  users.hasMany(stage_scores, { as: "stage_scores", foreignKey: "participant_id"});
  stage_scores.belongsTo(users, { as: "judger", foreignKey: "judger_id"});
  users.hasMany(stage_scores, { as: "judger_stage_scores", foreignKey: "judger_id"});
  ue_group_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(ue_group_members, { as: "ue_group_members", foreignKey: "user_id"});
  user_progress.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_progress, { as: "user_progresses", foreignKey: "user_id"});

  return {
    SequelizeMeta,
    answers,
    choices,
    faq,
    jury_group_members,
    jury_groups,
    question_banks,
    questions,
    recruitment_sessions,
    registrations,
    session_questions,
    stage_infos,
    stage_judgers,
    stage_scores,
    stages,
    ue_group_members,
    ue_groups,
    user_progress,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
