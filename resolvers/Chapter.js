const axios = require('../axios');

const getChapters = async (courseId) => {
	const table = 'courses';
	const entity = 'course';
	const descriminator = 'chapter';
	const response = await axios.get(`/${table}/${entity}/slug/${courseId}/`);
	const { data: chapters } = response.data.tablesList
		.find(t => t.metaData.name === `${table}_${entity}__${descriminator}`);

	const normalizedChapters = chapters.map(i => {
		i.title = i.name;
		i.content = JSON.stringify(i.content);
		return i;
	});

	return normalizedChapters;
};

const chapters = async (parent, args, ctx) => {
	const { courseId } = args;
	return await getChapters(courseId);
};

const chapter = async (parent, args, ctx) => {
	const { courseId, chapterId } = args;
	console.log('>>>', courseId, chapterId);
	const chapters = await getChapters(courseId);
	const founded = chapters.find(chapter => chapter.id === chapterId);
	return founded;
};

exports.chapters = chapters;
exports.chapter = chapter;