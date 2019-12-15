const axios = require('../axios');
const chaptersData = require('../data/chapters.json');

const getChapters = async (courseId) => {

	return chaptersData;
};

const chapters = async (parent, args, ctx) => {
	const { courseId } = args;
	return await getChapters(courseId);
};

const chapter = async (parent, args, ctx) => {
	const { courseId, chapterId } = args;
	const chapters = await getChapters(courseId);
	const founded = chapters.find(chapter => chapter.id === chapterId);
	return founded;
};

exports.chapters = chapters;
exports.chapter = chapter;
