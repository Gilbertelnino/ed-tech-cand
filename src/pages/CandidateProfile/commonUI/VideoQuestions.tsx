import * as React from "react";
import { Container, InputLabel, Theme, makeStyles } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
const useStyles = makeStyles((theme: Theme) => ({
  labelStyles: {
    //fontFamily: $secondary-font,
    color: "black",
    fontSize: "18px",
    marginTop: "2%",
    marginBottom: "3%",
    textAlign: "center",
    lineHeight: "24px"
  }
}))


const VideoQuestions: React.FunctionComponent<any> = () => {
  const classes = useStyles();
  return (

    <div>
      <Container id="video-questions-form" className="video-questions-form" >
        <InputLabel className="heading-form">employHER has put together some of the most popular get-to-know-you questions that are commonly used by many Fortune 500 companies.  </InputLabel>

        <div className="video-questions-list slim-scrollbar">
          <InputLabel>  1. What was your first job?</InputLabel>
          <p> By far, this question has prompted the most interesting responses for the companies we work with. Employees are always finding it hilarious to learn that their boss’ first job was as a pool boy, or find it fascinating that a coworker’s first job was working in her mom’s doctor’s office. While it’s an unassuming question, the responses stand out.</p>

          <InputLabel>2. Describe a time when you were under pressure and how you dealt with it?</InputLabel>
          <p>This simple behavioral question is a fairly self-explanatory one, used to vet out whether or not a candidate can handle a fast-paced environment! The best candidates will show that they’re more than willing to go the extra mile for a company but also understand the importance of a work-life balance (to avoid the risk of burnout).</p>

          <InputLabel>3. If you could be any cartoon character who would you be and why?</InputLabel>
          <p>Of course, you might also want to throw the odd left-field question in for good measure, especially when you’re on the hunt for creative candidates! Can they show off some of their great personality? Are they able to think creatively, on the spot?</p>

          <InputLabel>4. What are you reading right now?</InputLabel>
          <p>People are always looking for something new to read- and so swapping book recommendations are a great way for people to know each other. Learning what others are reading also provides insights into coworkers’ interests. David Heinemeier Hansson, CTO of Basecamp, shared his answer to this question here.</p>

          <InputLabel>5. How do you avoid missing deadlines?</InputLabel>
          <p>Disappointed? Google is infamous for asking ‘out-there’ questions to confuse their interviewees and this just seems a bit boring… right? But if you actually take a look at Google’s Glassdoor reviews, there are heaps of job candidates who recall being asked similar, basic things, proving that even Google prefers simple, honest questions at times.</p>

          <InputLabel>6. If you could pick up a new skill in an instant what would it be?</InputLabel>
          <p>With this question, you’ll learn how your coworkers want to grow or what they aspire to do. For instance, you might learn that a coworker would love to be able to pick up Italian instantly, or that your boss has always wanted to get good at woodworking. </p>

          <InputLabel>7. Describe a time when you had to use your creativity to influence someone.? </InputLabel>
          <p>Behavioral questions are arguably the most effective category of interview questions, giving you an opportunity to predict your candidate’s future behavior from how they’ve behaved in the past. And the more detail an interviewee gives, without faltering, the surer you can be that their answer is genuine </p>

          <InputLabel>8. Who’s someone you really admire?</InputLabel>
          <p>Understanding who someone looks up to reveals a significant amount about a person’s influences, preferences, and outlook on life. This is a great question to ask to help get a sense of what and who a person values.</p>

          <InputLabel>9. Describe a recent news article that interested you?</InputLabel>
          <p>This is a great question for companies who want to hire people who are genuinely interested in the industry; as opposed to those who are just looking for any old job! Asking about news articles, reading interests and other out-of-work activities that are relevant can separate the good candidates from the superstar passionate ones.</p>

          <InputLabel>10. Seen any good movies lately you’d recommend?</InputLabel>
          <p>Perhaps you’ve asked this question before — but don’t overlook it. Movies are a great shared conversation topic. It never fails to be one that people like to answer and like to see other people’s answers too. Oftentimes, people will end up going to see the movies that are recommended and talking about it over lunch, etc.</p>

          <InputLabel>11. Who inspires you?</InputLabel>
          <p>You can tell a lot about a person by who they’re influenced by, from celebrities and family members to managers and friends. Do their values fit in with your company’s culture? Are they inspired by any industry professionals? Are they motivated by family?</p>

          <InputLabel>12.Give an example of a time you had to make a decision without having all of the relevant information?</InputLabel>
          <p>For me, alarm bells would immediately be ringing – is this a trick question? Of course, the interviewer is looking for a balanced answer. You don’t want an employee who rushes into decisions without seeking all of the relevant information, but you also don’t want an employee who isn’t willing to take a risk, if needs must.</p>

          <InputLabel>13. Got any favorite quotes?</InputLabel>
          <p>Personally, I’m a sucker for a good quote. I think it can provide a fascinating look at a person’s point-of-view. Asking about a person’s favorite quote is a great way to break the ice and get to know them better.</p>

          <InputLabel>14. Give us an example of a time when you’ve been under pressure to change a course of action, but you persevered regardless.</InputLabel>
          <p>Again, this question is all about balance. You don’t really want an employee who would disregard their manager’s advice or instruction, but you also don’t want an employee who’s not willing to fight their corner. A good answer would demonstrate a willingness to liaise with superiors, advising them if a certain course of action doesn’t seem appropriate, but also an understanding that, at the end of the day, they must accept their manager’s decision.</p>

          <InputLabel>15. Been pleasantly surprised by anything lately?</InputLabel>
          <p>While this question may seem vague, the answers to this question are often a delight and intriguing to read. Someone might share an excellent customer service experience that surpassed their expectations or share a funny story about them liking squash soup despite their initial reservations. This is especially a great question to ask a group of folks who might know each other a little better already. </p>

          <InputLabel>16. What was your favorite band 10 years ago?</InputLabel>
          <p>This question always elicits a chuckle or two. You’ll find out that you shared an embarrassing favorite band from years ago, and also find the generational difference between coworkers humorous as well.</p>

          <InputLabel>17. How many tennis balls could you fit in Wimbledon?</InputLabel>
          <p>You’ve probably heard this one before, in fact, it seems to be a favorite, as far as brainteasers go. Could you answer it?</p>

          <InputLabel>18. What’s your earliest memory?</InputLabel>
          <p>This is typically something that’s not shared even between close friends — so asking about it creates a special connection between folks. Hearing about an intimate, early part of someone’s life says a lot about who they are.</p>

          <InputLabel>19. What three words would your friends use to describe you?</InputLabel>
          <p>A twist on the old ‘tell me about yourself’ this quirky question will reveal what a candidate is really like, giving them a chance to reveal something a little more natural about themselves (are they a good listener? The joker of the group? A calming presence?).</p>

          <InputLabel>20. Been anywhere recently for the first time?</InputLabel>
          <p>Sharing a new, novel experience is a wonderful way to create a sense of connection between people. You’ll learn about a new restaurant, a fun out-of-the-city getaway, or a never-heard-about bookstore you might find interesting.</p>

          <InputLabel>21. What’s your favorite family tradition?</InputLabel>
          <p>Cooking Korean dumplings together around the holidays is one of mine. When you ask this question, you get an inside look into your coworker’s family’s heritage and the things that bring their family together.</p>

          <InputLabel>22. What is the best thing in your life? What is the worst thing about your life?</InputLabel>
          <p>Another great question to assess a candidate’s personality… are they an inherently negative or positive person? Using your initiative, you’ll probably going to be able to tell (do they more easily answer one question or another? How do they react to the question?) Beware of over-sharers and those who are overly negative – they clearly don’t understand professional boundaries.</p>

          <InputLabel>23. Who had the most influence on you growing up?</InputLabel>
          <p>A mother, a sports hero, a grandparent, an elementary school teacher… This question is touching to hear the answer to. You’ll gain a sense of respect about who has shaped your coworkers.</p>

          <InputLabel>24. What was the first thing you bought with your own money?</InputLabel>
          <p>Maybe it was a goldfish as a pet or a pair of Air Jordans. This is another great question that fosters a sense of nostalgia and provides insights into people’s interests in the past and what they valued when they were younger.</p>

          <InputLabel>25. Tell us about a time when you had to challenge your supervisor?</InputLabel>
          <p>Sometimes, managers do get it wrong (shock!) and it’s important that their staff feel comfortable to question their decisions. We’re not talking about people who constantly undermine co-workers and bosses but being able to proactively (and sensitively) approach others is a fantastic characteristic to have on your team. In our recent blog 14 Tell-Tale Signs You’re A Bad Boss we discussed the ‘it’s my way or the highway mentality’ and how it disrupts the success of a business. If this is the way YOU think… it’s time to reassess!</p>

          <InputLabel>26. What’s something you want to do in the next year that you’ve never done before?</InputLabel>
          <p>I love asking this question instead of the stale, “Do you have any goals this year?” Rather, this is a great aspirational question that exposes people’s dreams and hopes they’d love to pursue.</p>

          <InputLabel>27. Explain a situation when you were the first person to take action.</InputLabel>
          <p>I like this question because it’s really open to interpretation. An interviewee’s answer could be anything from a First-Aid emergency, sports triumph or workplace grand idea. It’ll show off how well they can think on their feet and whether they’re a doer or a thinker. You want someone who can seize the day!</p>

          <InputLabel>28. Seen anything lately that made you smile?</InputLabel>
          <p>The answers from this question are often unexpectedly lovely. You’ll find yourself nodding your head as a coworker talks about his kids or about a beautiful tree she saw on her walk recently.</p>

          <InputLabel>29. Are you a leader?</InputLabel>
          <p>Leadership skills really are a sought-after (and hard to find) commodity in business – so why not just cut the crap and ask them straight? Great candidates will be able to easily relay concrete and genuine examples. Do beware of stories that sound generic or fabricated though; job candidates may have prepared for this one.</p>

          <InputLabel>30. What’s your favorite place you’ve ever visited?</InputLabel>
          <p>Responses to this are varied and fun — you’ll find that some folks have the same “favorite place” in Spain that they’ve visited, or a place that happens to be just 20 minutes from where you live.</p>

          <InputLabel>31. Tell me about a time when you had to deal with a difficult boss.</InputLabel>
          <p>This is a standard left-field question, aimed at tripping up candidates and revealing any problems they may have had with past bosses. They’ll feel uncomfortable not answering at all (it’s against the interview rules) and might just reveal a little too much!</p>

          <InputLabel>32. Have you had your 15 minutes of fame yet?</InputLabel>
          <p>This is a cheeky question that turns up a variety of answers and interpretations. You might be impressed with how a coworker was in the newspaper one time or get a good laugh about how they were on the evening news</p>

          <InputLabel>33. Describe yourself to me with one word.</InputLabel>
          <p>The worst way a candidate can respond is by using a recruitment ‘buzzword‘ like ‘dynamic,’ ‘hard-working’ or ‘self-motivated’. What you really want to know is how they perceive themselves, whether that perception matches the impression you have of them and whether they’d fit into your company culture! Savvy, confident and friendly candidates will give away something personal and endearing, yet professionally appealing!</p>

          <InputLabel>34. What’s the best advice you’ve ever heard?</InputLabel>
          <p>I’m a big fan of this question, as you’re essentially asking a person about what wisdom they personally find most valuable. The best advice I’ve ever received, myself? “Trust yourself.”</p>

          <InputLabel>35. How do you like your eggs?</InputLabel>
          <p>Our customers who ask this question are always shocked by how popular the answers to it are. They discover that colleagues are immensely passionate about scrambled eggs or are sunny-side-up diehards.</p>

          <InputLabel>36. Do you have a favorite charity you wish more people knew about?</InputLabel>
          <p>This is a fantastic question to ask. One company I know took it as a way to make a small donation to each charity mentioned.</p>

          <InputLabel>37. Got any phobias you’d like to break?</InputLabel>
          <p>Spiders, heights, the ocean… Sharing fears is always a great way to feel closer to someone.</p>

          <InputLabel>38. Have you returned anything you’ve purchased recently? Why?</InputLabel>
          <p>Ask this question and you’ll unearth some interesting observations on why people buy things  and what they find unsatisfactory.</p>

          <InputLabel>39. Do you collect anything?</InputLabel>
          <p>Skip the boring question, “What are your hobbies?” and ask this instead. You might find that someone is an unexpectedly avid butterfly collector (my uncle does this) or enjoys finding a new postcard every time she travels (my mom does this). Regardless, it’s a more unique way to learn about a person’s interest.</p>

          <InputLabel>40. What’s your favorite breakfast cereal?</InputLabel>
          <p>This question continually (and surprisingly) blows people away with the response when they ask it. One customer of ours had such an enthusiastic response on this from her staff, she created a Cereal Day for her team.</p>
        </div>
      </Container>
    </div>

  );


}
export default VideoQuestions;
