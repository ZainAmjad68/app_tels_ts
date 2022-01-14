import * as shell from "shelljs";

// Copy all the view templates
shell.cp("-R", "src/views", "build/");

// Copy all the other assets
shell.cp("-R", "src/public", "build/");

// Copy all the other assets
shell.cp("-R", "src/config/environments", "build/config/");
