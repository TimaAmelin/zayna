export function getComponentFileText(componentName) {
	return (
		'import React from \'react\';\n' +
        `import { ${componentName}Container } from './${componentName}.css';\n\n` +
        `export const ${componentName} = () => {\n` +
        '    return (\n' +
        `        <${componentName}Container>\n` +
        '            \n' +
        `        </${componentName}Container>\n` +
        '    )\n' +
        '}'
	);
}

export function getStyleFileText(componentName) {
	return (
		'import { Box, styled } from \'@mui/material\';\n\n' +
        `export const ${componentName}Container = styled(Box)(() => ({\n` +
        '    \n' +
        '}));'
	);
}