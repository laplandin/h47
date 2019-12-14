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
	const { id } = args;
	const table = 'courses';
	const entity = 'course';
	const descriminator = 'chapter';
	console.log(id, `/${table}/${entity}/slug/${id}/`);
	const response = await axios.get(`/${table}/${entity}/slug/${id}/`);
	const { data: course } = response.data.formsList[0];
	course.title = course.name;
	course.coverImage = course.picture;
	course.tag = course.tag.name;
	course.level = parseInt(course.difficulty.name);
	course.enrolledUsers = Math.round(Math.random() * 100);
	course.createDate = course.created_date;
	course.enrolledUsers = course.enrolled_users;
	
	const { data: chapters } = response.data.tablesList
		.find(t => t.metaData.name === `${table}_${entity}__${descriminator}`);
		
	const normalizedChapters = chapters.map(i => {
		i.title = i.name;
		i.content = JSON.stringify(i.content);
		return i;
	});

	const res = { ...course, ...{ chapters: normalizedChapters } };
	// console.log(res);
	return res;
};

exports.courses = courses;
exports.course = course;
