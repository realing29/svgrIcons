import fs from 'fs'
import path from 'path'
import { transform } from '@svgr/core'
import { transformConfig } from './transform.config.js'

const folders = ['outline', 'solid']

async function convertSvgToJsx(filePath, newFileName) {
	// Read SVG from the file
	const svg = fs.readFileSync(filePath, 'utf-8')

	// Convert SVG to JSX
	const config = { namedExport: newFileName }
	const jsx = await transform(
		svg,
		{ ...transformConfig, ...config },
		{ componentName: newFileName },
	)

	// Write JSX to the new file
	fs.writeFileSync(`${path.join('icons', newFileName)}.jsx`, jsx)
}

async function generateJsxFiles() {
	for (const folder of folders) {
		// Read all files from the folder
		const files = fs.readdirSync(folder)

		for (const file of files) {
			const filePath = path.join(folder, file)

			// Prepare the new file name
			const baseName = path.basename(file, '.svg')
			const formattedBaseName = baseName
				.split('-')
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join('')
			const newFileName = `${formattedBaseName}${
				folder.charAt(0).toUpperCase() + folder.slice(1)
			}Icon`

			await convertSvgToJsx(filePath, newFileName)
		}
	}
}

async function generateExportsFile() {
	let exportsFileContent = ''

	fs.readdirSync('icons').forEach((file) => {
		if (path.extname(file) === '.jsx') {
			exportsFileContent += `export * from './${file}'\n`
		}
	})

	fs.writeFileSync(path.join('icons', 'index.js'), exportsFileContent)
}

async function main() {
	await generateJsxFiles()
	await generateExportsFile()
}

main()
