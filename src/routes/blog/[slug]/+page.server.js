import { error } from '@sveltejs/kit';
import { posts } from '../data.js';
import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);

	//if (!post) throw error(404);
	if (!post) {
		throw redirect(307, '/blog');
	}

	return {
		post
	};
}
