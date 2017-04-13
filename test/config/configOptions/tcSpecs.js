var postfix;
process.env.POSTFIX === 'mockSpec' ? postfix='mockSpec' : postfix='*';

var specs = {
    copy: {
        include: ['../client/AutomationSolution/FunctionalTests/Copy/*.'+postfix+'.js']
    },
    diaryList: {
        include: ['../client/AutomationSolution/FunctionalTests/DiaryList/*.'+postfix+'.js']
    },
    emailAndIRConnectUpload: {
        include: ['../client/AutomationSolution/FunctionalTests/Email/*.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/IRConnect/*.'+postfix+'.js']
    },
    fileRelatedTasksAndLockedTaskView: {
        include: ['../client/AutomationSolution/FunctionalTests/LockedTaskView/*.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/FileRelatedTasks/*.'+postfix+'.js']
    },
    filesView: {
        include: ['../client/AutomationSolution/FunctionalTests/FilesView/*.'+postfix+'.js'],
        exclude: ['../client/AutomationSolution/FunctionalTests/FilesView/CreateTask.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/FilesView/CreateDiary.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/FilesView/RelatedFiles.'+postfix+'.js']
    },
    fileViewAvangers: {
        include: ['../client/AutomationSolution/FunctionalTests/FilesView/CreateTask.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/FilesView/CreateDiary.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/FilesView/RelatedFiles.'+postfix+'.js']
    },
    fileUpload: {
        include: ['../client/AutomationSolution/FunctionalTests/FileUpload/*.'+postfix+'.js']
    },
    login: {
        include: ['../client/AutomationSolution/FunctionalTests/zLoginAndUserSettings/*.'+postfix+'.js']
    },
    move: {
        include: ['../client/AutomationSolution/FunctionalTests/Move/*.'+postfix+'.js']
    },
    multiSelectAndTreeNavigation: {
        include: ['../client/AutomationSolution/FunctionalTests/MultiSelect/*.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/TreeNavigation/*.'+postfix+'.js']
    },
    nonTreeNavigation: {
        include: ['../client/AutomationSolution/FunctionalTests/NonTreeNavigation/*.'+postfix+'.js']
    },
    searchAndWebdav: {
        include: ['../client/AutomationSolution/FunctionalTests/Search/*.'+postfix+'.js',
            '../client/AutomationSolution/FunctionalTests/Webdav/*.'+postfix+'.js']
    },
    toDoList: {
        include: ['../client/AutomationSolution/FunctionalTests/ToDoList/*.'+postfix+'.js']
    },
    dashboard: {
        include: ['../client/AutomationSolution/FunctionalTests/Dashboard/*/*.'+postfix+'.js',
                '../client/AutomationSolution/FunctionalTests/Dashboard/*/*/*.'+postfix+'.js']
    },
    all: {
        include: ['../client/AutomationSolution/FunctionalTests/*/*.'+postfix+'.js',
                 '../client/AutomationSolution/FunctionalTests/*/*/*.'+postfix+'.js',
                 '../client/AutomationSolution/FunctionalTests/*/*/*/*.'+postfix+'.js']
    }
};

module.exports = specs;
