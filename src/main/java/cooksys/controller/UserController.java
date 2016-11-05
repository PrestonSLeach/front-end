package cooksys.controller;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cooksys.entity.Credential;
import cooksys.entity.Tweet;
import cooksys.entity.User;
import cooksys.request_models.CreateProfileRequestModel;
import cooksys.service.UserService;

@RestController
@RequestMapping("users")
public class UserController {

	private UserService userService;

	public UserController(UserService service) {
		this.userService = service;
	}

	@GetMapping
	public List<User> get() {
		return userService.get();
	}

	@GetMapping("/@{username}")
	public User getUserByName(@PathVariable String username) {
		return userService.getByUsername(username);
	}

	@GetMapping("/@{username}/following")
	public Set<User> getUserFollows(@PathVariable String username) {
		return userService.getUserFollows(username);
	}

	@GetMapping("/@{username}/followers")
	public Set<User> getUserFollowers(@PathVariable String username) {
		return userService.getUserFollowers(username);
	}

	@GetMapping("/@{username}/feed")
	public List<Tweet> getUserFeed(@PathVariable String username) {
		return userService.getUserFeed(username);
	}

	@GetMapping("/@{username}/mentions")
	public List<Tweet> getUserMentions(@PathVariable String username) {
		return userService.getUserMentions(username);
	}

	@PostMapping
	public User add(@RequestBody CreateProfileRequestModel createProfileRequestModel) throws Exception {
		return userService.add(createProfileRequestModel);
	}

	@PatchMapping("/@{username}")
	public User patch(@PathVariable String username, @RequestBody CreateProfileRequestModel createProfileRequestModel) {
		if (createProfileRequestModel.getCredential().getUsername().equals(username)) {
			return userService.update(createProfileRequestModel);
		} else {
			throw new Error("No username found");
		}
	}

	@PostMapping("/@{username}/follow")
	public String follow(@PathVariable String username, @RequestBody Credential credential) {
		if (userService.follow(username, credential)) {
			return null;
		} else {
			return "ERROR";
		}
	}

	@PostMapping("/@{username}/unfollow")
	public String unFollow(@PathVariable String username, @RequestBody Credential credential) {
		if (userService.unFollow(username, credential)) {
			return null;
		} else {
			return "ERROR";
		}
	}
}
