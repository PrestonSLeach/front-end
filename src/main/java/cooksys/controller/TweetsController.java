package cooksys.controller;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cooksys.entity.Credential;
import cooksys.entity.Tag;
import cooksys.entity.Tweet;
import cooksys.entity.User;
import cooksys.projections.DeletedTweetProjection;
import cooksys.request_models.TweetCreationRequestModel;
import cooksys.response_models.Context;
import cooksys.service.TweetService;

@RestController
@RequestMapping("tweets")
public class TweetsController {

	TweetService tweetService;

	public TweetsController(TweetService service) {
		this.tweetService = service;
	}

	@GetMapping
	public List<Tweet> get() {
		return tweetService.getAll();
	}

	@GetMapping("/{id}")
	public Tweet get(@PathVariable Long id) throws Exception {
		return tweetService.getTweet(id);
	}

	@GetMapping("/{id}/tags")
	public List<Tag> getTweetsTags(@PathVariable Long id) {
		return tweetService.getTweetTags(id);
	}

	@GetMapping("/{id}/mentions")
	public List<User> getTweetsMentions(@PathVariable Long id) {
		return tweetService.getTweetMentions(id);
	}

	@PostMapping
	public void add(@RequestBody TweetCreationRequestModel tweetRequest) {
		tweetService.add(tweetRequest);
	}

	@PostMapping("/{id}/repost")
	public void repost(@PathVariable Long id, @RequestBody TweetCreationRequestModel tweetCreationRequestModel)
			throws Exception {
		tweetService.repost(id, tweetCreationRequestModel);
	}

	@PostMapping("/{id}/reply")
	public void reply(@PathVariable Long id, @RequestBody TweetCreationRequestModel tweetCreationRequestModel)
			throws Exception {
		tweetService.reply(id, tweetCreationRequestModel);
	}

	@PostMapping("/{id}/like")
	public void like(@PathVariable Long id, @RequestBody Credential credential) throws Exception {
		tweetService.like(id, credential);
	}

	@DeleteMapping("/{id}")
	public DeletedTweetProjection delete(@PathVariable Long id, @RequestBody Credential credential) throws Exception {
		return tweetService.delete(id, credential);
	}

	@GetMapping("/{id}/reposts")
	public List<Tweet> getReposts(@PathVariable Long id) throws Exception {
		List<Tweet> reposts = tweetService.getReposts(id);
		return reposts;
	}

	@GetMapping("/{id}/replies")
	public List<Tweet> getReplies(@PathVariable Long id) throws Exception {
		return tweetService.getReplies(id);
	}

	@GetMapping("/{id}/likes")
	public Set<User> getLikes(@PathVariable Long id) throws Exception {
		return tweetService.getLikes(id);
	}

	@GetMapping("/{id}/context")
	public Context getContext(@PathVariable Long id) throws Exception {
		return tweetService.getContext(id);
	}
}
