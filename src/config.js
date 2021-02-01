import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import { assert, object, string, array, validate } from "superstruct";


const CONFIG_PATH = path.join(__dirname, "..", "config.yml");

const config = yaml.load(fs.readFileSync(CONFIG_PATH, "utf-8"));

const configStruct = object({
  token: string(),
  server: string(),
  autoroles: array(string()),
  modroles: array(string()),
  prefix: string(),
  welcomechannel: string(),
});

const [err, validated] = validate(config, configStruct);
if (err)
  throw err;

export default validated;
