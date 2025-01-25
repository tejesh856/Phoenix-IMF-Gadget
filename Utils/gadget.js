const validStatuses = ["Available", "Deployed", "Destroyed", "Decommissioned"];
const codenames = [
  "The Nightingale",
  "The Kraken",
  "Shadow Phantom",
  "Iron Falcon",
  "Silent Viper",
  "Storm Breaker",
  "Dark Sentinel",
  "Ghost Reaper",
];

const generateCodename = () => {
  return codenames[Math.floor(Math.random() * codenames.length)];
};
const generateConfirmationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
module.exports = { validStatuses, generateCodename, generateConfirmationCode };
