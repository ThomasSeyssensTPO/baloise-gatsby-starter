# README.md

## explanation about the project
The project itself is a white-label-setup for a lead generator.
In this case for Ford.

It uses the components that live under **packages/ui/car-whitelabel-components.**

Each and every page is build from a source file. (cfr ./src/utils/sources/pages/index.json)
Every page is build up with all parameters that are found in the PageInterface interface.

The source will be read through by gatsby and pages will be made corresponding the url's that are added in the objecT.

Every page has a fields array as a prop.
The fields will then render through a FieldMapper.
It will pass on all functions needed for the fields to function and store it in session storage.
