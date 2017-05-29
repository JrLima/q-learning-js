A Javascript Q-Learning implementation for the Data Mining course of UEMA's Computer Engineering bachelor's degree, as required in the md-8.pdf file.

This software takes the given NxM matrix of states and prints out the NxMxNxM Q-Table.

# Running

In a terminal window, go to project's directory and run the index.js file.

	
	cd q-learning-master
	node .
	
You can also set the Gamma, initial state, and matrix of states in the environent.jsm file.

# TODOs

1. Move strategies and check functions to environment.jsm without exceeding maximum call stack size or delaying it by setTimeout.

# Dependencies

[Node.js](https://nodejs.org/) is required to run the application.

