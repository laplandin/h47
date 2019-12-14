const { get } = require('lodash');
const axios = require('../axios');
const { DATA_PATH, TAGS_ENUM } = require('../const');

// getRandomTag =
// picture -> coverImage
// course progress(courseId, UserId) -> enrolled
// content
const courses = async () => {
	console.log('start');
	const courses = await axios.get('/courses/course/');
	const data = courses.data.tablesList;
	const pureData = data
		.map(item => item.data)
		.flat()
		.map(item => {
			item.title = item.name;
			item.coverImage = item.picture;
			item.tag = item.tag.name;
			item.level = parseInt(item.difficulty.name);
			item.enrolledUsers = Math.round(Math.random() * 100);
			item.createDate = item.created_date;
			item.enrolledUsers = item.enrolled_users;
			return item;
		});
	console.log('end');
	// const params = new URLSearchParams();
	// pureData.forEach(course => params.append('course', course.id));
	//
	// const courseProgress = await axios.get(`/courses/courseprogress/`, params);
	// const progressPureData = courseProgress.data.tablesList.flat();
	// const pureDataWithProgress = Object.entries(pureData).reduce((acc, [key, courseItem]) => {
	// 	const { id } = courseItem;
	// 	const founded = progressPureData.find(progressItem => progressItem.course.id === id);
	// 	console.log('founded', founded);
	//
	// 	return acc;
	// }, {});
	// console.log('>>>', progressPureData);

	return pureData;
};

const course = async (parent, args, context) => {
	console.log(args.id);
	const table = 'courses';
	const entity = 'course';
	const descriminator = 'chapter';
	console.log(id, `/${table}/${entity}/slug/${args.id}/`);
	const course = await axios.get(`/${table}/${entity}/slug/${id}/`);
	const { data } = course.data.tablesList.find(table => table.metaData.name === `${table}_${entity}__${descriminator}`);
	console.log('data', data);
	const pureData = data
		.map(item => {
			item.title = item.course.name;
			item.chapters = item.chapter;
			return item;
		});
	return pureData;
};

exports.courses = courses;
exports.course = course;
