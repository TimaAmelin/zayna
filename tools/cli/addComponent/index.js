import fs, { mkdirSync } from 'fs';
import { getComponentFileText, getStyleFileText } from './helpers.js';

const types = ['component', 'page'];

function makeComponent(componentName, type) {
	if (componentName[0].toUpperCase() !== componentName[0]) {
		console.log('Inappropriate component name');
		return;
	}

	if (!types.includes(type)) {
		console.log('Inappropriate component type');
		return;
	}

	const components = fs.readdirSync('./services/client/src/components');

	if (components.includes(componentName)) {
		console.log(`Can't create component with such name`);
		return;
	}

	console.log('Process started');
    
	try {
		mkdirSync(`./services/client/src/components/${componentName}`);
	} catch (error) {
		console.log('Something went wrong during creation of folder');
		console.error(error);
		return;
	}

	console.log('-- Folder created');
    
	try {
		fs.writeFileSync(`./services/client/src/components/${componentName}/${componentName}.tsx`, getComponentFileText(componentName));
	} catch (error) {
		console.log('Something went wrong during creation of component file');
		console.error(error);
		console.log(`Deleting component`);
		fs.rmdirSync(`./services/client/src/components/${componentName}`);
		return;
	}

	console.log('-- Component file created');
    
	try {
		fs.writeFileSync(`./services/client/src/components/${componentName}/${componentName}.css.ts`, getStyleFileText(componentName));
	} catch (error) {
		console.log('Something went wrong during creation of style file');
		console.error(error);
		console.log(`Deleting component`);
		fs.rmSync(`./services/client/src/components/${componentName}/${componentName}.tsx`);
		fs.rmdirSync(`./services/client/src/components/${componentName}`);
		return;
	}

	console.log('-- Style file created');
	console.log('Process finished successfully');
}

const componentName = process.argv[2];

const type = process.argv[3];

makeComponent(componentName, type);