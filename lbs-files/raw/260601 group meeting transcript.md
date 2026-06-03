genAI group meeting-20260601_113329-Meeting Transcript
1 June 2026, 10:33am
27m 0s

Joao Carvalho Rosa De Morais started transcription

Angela Chan   0:03
And walked.

Joao Carvalho Rosa De Morais   0:03
Angela, sorry.

Angela Chan   0:05
Yeah.

Fernando Palo Del Mar   0:05
Okay.

Joao Carvalho Rosa De Morais   0:07
Start the answer again, now that I'm transcribing, please.

Angela Chan   0:12
Oh, okay, okay. So basically it.

Joao Carvalho Rosa De Morais   0:14
Thanks, because what you're saying is like gold and I need that, I need that transcribed.

Angela Chan   0:18
Okay. Okay. Wait, did I do something wrong? Okay.

Fernando Palo Del Mar   0:21
Whisper, do whisper.

Angela Chan   0:24
Okay, so basically, yeah, in our shared document, you will, there's a, there is a file Excel sheet called Events Management Lifecycle and it has the itemised version of what it takes from ideation to post event execution of it, which is 7 phases. Our tool in its
final version and the ultimate goal would be to be able to cover the first five of these seven phases. And essentially what I mean by cover it is it would help students who are planning these events to guide them through that entire process. And that document basically itemises everything that it takes to make an event happen.
And so this would basically be the assistant as based on whatever the student is needs and whatever type of event, it will educate them and actually ensure they are informed of the appropriate processes and stakeholders. And for the MVP, I would say basically we are trying to make an MVP that covers the first three phases.

Fernando Palo Del Mar   1:26
Okay.

Angela Chan   1:26
To some degree, and I say that because there are majority of the forms that happen happen in the first three phases. And so I think basically if we can show how by talking to our tool, it can pre populate the submission forms to like basically the perfect way where you just send it to the stakeholder and you are.
more than ready and more than good to proceed. And that is what we want to show.

Fernando Palo Del Mar   1:55
No, we're brief. OK, that is good.

Angela Chan   1:59
Yeah.

Fernando Palo Del Mar   2:01
So just like focus on one to three. So this is the MVP will be the one to three, but we need to show all the seven part of the process. Yeah.

Angela Chan   2:10
Yeah, I feel like, well, that's basically I think that goes in behind the behind the scenes, like how do we figure it out, right? We spoke to Joe, we said we figured out there are seven phases, our tool, it makes sense to support up to basically phase five, our MVP, we have managed to figure out a certain degree of up to phase three.

Fernando Palo Del Mar   2:25
No, face.

Angela Chan   2:29
Basically.

Fernando Palo Del Mar   2:30
Okay.

Joao Carvalho Rosa De Morais   2:31
Yeah, so basically, basically, we will what we're building is is gonna be up to phase three, is gonna also say, like, who else needs to be involved, what level of attention just does Joe need to provide this?

Fernando Palo Del Mar   2:32
And, okay.

Joao Carvalho Rosa De Morais   2:50
this event, blah, blah, blah, right?

Angela Chan   2:57
Yeah, so I guess that's kind of my question here basically, because when we were first talking about this, the feasibility in terms of how this actually most tangibly helps Joe, I think was TBD in terms of how feasible like an Monday.com API or whatever situation is.
But yes, it would basically, it should be able to help with that process of Joe recognising which events are the ones that he needs to care about, aka the key events that we have the dynamic for. And that also goes in hand with this tiering process that LBS is trying to do.

Joao Carvalho Rosa De Morais   3:26
Yeah.

Angela Chan   3:35
And so essentially the value of having the AI as a tool here is that it should be learning and recognising through these processes. Like what actually makes sense for those tiers, like what, how to actually make a standardised rubric for key events or for tiering systems versus the current like holistic undocumented version that LBS currently does.

Joao Carvalho Rosa De Morais   3:35
Yeah.
Yeah, yeah, agreed. I think that's, I think that what's being built is very much on that. I think the understanding is the same, and I think that the different, the, the, the ways that we can split the work, I think, are...

Angela Chan   4:09
Yeah, okay.

Joao Carvalho Rosa De Morais   4:16
are, I mean, if we're just building up to three, then there's a big chunk of work that is like understand what we already have and what will need to be improved. So for example, we're going to deliver something that is literally like it goes to OpenAI. OpenAI has more or less the heuristic of how to prioritise the different events and it returns a rationale.

Fernando Palo Del Mar   4:21
Yeah.

Joao Carvalho Rosa De Morais   4:39
but we're going to need to like refine that into something that can be continuously updated, right? We will need to like create like a feedback loop or like a way for the AI to keep learning how to better categorise the events, so on and so forth. So that's something that is going to be done post MVP.
So I think that is like works from three, right?

Angela Chan   5:02
Okay, gotcha.

Joao Carvalho Rosa De Morais   5:02
Like, does that make sense? Does that make sense? Like, that, that's like one example of what works from three would be, so like the works from one would be what you are doing right now, Angela, like you're providing us all of the business logic with all connected with with Joe, the one that like brought brought the processing, you have you have the entire notion and um you're like kind of like the.

Fernando Palo Del Mar   5:05
Right.

Angela Chan   5:05
Yeah.

Joao Carvalho Rosa De Morais   5:23
The client, like, you're the one saying, yeah, this is what should this is what we want. I would be like a PM who is by coding the technical thing. I will, I'm doing like the the product, I'm doing like the requirements, the PRD, Codex is doing the actual coding, I'm running the tests, see if like everything's going on.

Angela Chan   5:29
****.

Joao Carvalho Rosa De Morais   5:45
And Fernando can be the third guy that can go into Codex. Codex knows everything that was written and just chats to it and say, hey, by the way, this is what we're trying to do. What is, what doesn't exist already? Remember, this is going to be for like a non-technical user. And then they're going to like create a plan with it. And if you need to like refine it, you can do it either with Codex or with Claude.

Fernando Palo Del Mar   5:53
Yeah.

Joao Carvalho Rosa De Morais   6:09
Like Codex functions really well as like a chat interface. You can use it as ChatGPT. Honestly, I use it, I do it sometimes. And then four would be like literally packing everything up into like something that can be delivered to LBS, like the presentation, like making sure that everything is.

Fernando Palo Del Mar   6:15
Yeah.
Yeah.

Joao Carvalho Rosa De Morais   6:28
is like cross-reference correctly, doing the final review and like running it past you, you know, but having like the final, the final responsibility for putting everything together. And you, Angela, are going to be like the client, and we all need to be like sure that you're happy with what we're doing. Like, does this make sense? I think this is much closer to how like an actual product.

Fernando Palo Del Mar   6:45
Yeah.

Joao Carvalho Rosa De Morais   6:50
the delivery goals instead of just like four different pseudo engineers doing separate things and like making my life in Git harder.

Angela Chan   6:53
Yeah.

Fernando Palo Del Mar   6:54
Yeah.

Angela Chan   6:59
Yeah, I...

Fernando Palo Del Mar   6:59
Yeah, the, the.
Yeah, the only part for me, I can do like the third topic, the decision, but I need your support, even for my learning process, because when I know, because I know how to do the thing, but if you can do just like a like a time that is convenient for you, and now I'm just out of the corporate exam, so this week I'm just like more comfortable.

Angela Chan   7:02
Go ahead.

Joao Carvalho Rosa De Morais   7:10
Okay.

Fernando Palo Del Mar   7:22
And if we can work together on this, even for me would be a great help and for my learning would be better. So happy to be, if we can do this together, yeah.

Joao Carvalho Rosa De Morais   7:22
Mhm.
Of course.

Angela Chan   7:30
Yeah.
One thing I was wondering, I've managed to play, I managed to finally figure out how to download everything and like play around with Codex Desktop myself. And while trying to do whatever, basically, like I just took one thing, the finance code directory, and try to like put it in as just like one feature.

Joao Carvalho Rosa De Morais   7:32
Of course.

Fernando Palo Del Mar   7:34
Okay, thanks.

Angela Chan   7:52
to see if it would be able to identify, like if I put an event in, we'll be able to pull correctly from the finance code directory essentially. And then whether or not I can tell the chat bot essentially responds. And then from that process, I kind of realised that there seems to be like a bit more details are needed to like.
train the or train or figure out how to prompt the the chat bot, like what interactions, what responses we want it to be giving into the different parts. So I'm kind of curious, like how does that component fall into these different work streams or the way we're arranging it right now?

Fernando Palo Del Mar   8:28
Yeah.

Joao Carvalho Rosa De Morais   8:30
That I think is like, if we can't get the actual finance codes, is going to be like on both MVP, like what we don't have, stuff that we're...

Angela Chan   8:42
Like, we have it, like, we have it, so, like, for example, I set it to like my version of the app that we have, like, on my desktop thing, is like, yeah, because there's 5000 codes, and I just want to test, it was like, oh, I know I'm doing this event, and I just want to see whether or not the bot would be able to, like, realise that that's happening, and just the conversation when me testing.

Joao Carvalho Rosa De Morais   8:54
No.

Angela Chan   9:01
what it has so far, just the way it talks back, basically. It's like that prompting practice, I think, in terms of like giving it more details in terms of like when this, when the user says this, I want this kind of, I want the user to see this from the assistant. Like I think that kind of like, like specs.
That, that's I guess what, like, where does like that kind of specification, I guess, fall or prompting practise in the system fall under these worksheets we have?

Joao Carvalho Rosa De Morais   9:21
Yeah.
Let me, let, let me.

Angela Chan   9:33
Because I think what I'm basically learning, my current learning of like what how I'm processing it is like we have the we have a lot of the full empty forms to put and also the toolkit of course as the basic foundation of our database if you will. And then in terms of like how it pulls.

Fernando Palo Del Mar   9:34
Yep.

Joao Carvalho Rosa De Morais   9:36
No.

Fernando Palo Del Mar   9:50
Gus.

Angela Chan   9:52
and how it responds to the user based on this information. And realizing, one, it needs like more rules from us, like us deciding the rules in terms of how it gives, how it responds, and two, probably just find some more data in terms of like, what does a good completed form looks like and how it should interpret those things.

Joao Carvalho Rosa De Morais   9:55
Yeah, yeah, yeah.

Angela Chan   10:13
And so I think in terms of that learning process or giving it, et cetera, where does that fall? Because I've been playing around with trying to figure out those specs, but I don't know, like, I'm happy to like give a draught for example to you, and then like you figure out how to actually make code and do something with it. Would that make sense?

Fernando Palo Del Mar   10:17
Yeah.
****.
Okay.

Joao Carvalho Rosa De Morais   10:26
Yeah, do it.

Fernando Palo Del Mar   10:30
But, but one would it be good if you just if we have like, I don't know, maybe blocked two hours this week and we do all these things together? I'm not sure potentially is more productive to be together just like working all these topics on the same room then.

Angela Chan   10:45
Yeah, I just don't think we're gonna be able to figure that out.

Fernando Palo Del Mar   10:49
No, no, just.

Joao Carvalho Rosa De Morais   10:50
Does Wednesday 10 A.m. work for everyone for one hour?

Fernando Palo Del Mar   10:52
Yes.

Angela Chan   10:55
No.

Joao Carvalho Rosa De Morais   10:56
What time does it work for you?
What are the best times, Angela, for you?

Fernando Palo Del Mar   11:01
Yeah, and just give, yeah, give your your best time.

Joao Carvalho Rosa De Morais   11:03
Yeah, about about the the trials, Angela, like I asked it to do this. This is basically this is basically like it created like 3, it created like 5 sample sample events, like based based.

Angela Chan   11:09
Yeah.
Yeah.

Joao Carvalho Rosa De Morais   11:21
Based on the examples from Joe or whatever, and I this is just like the work stream for work, so it's literally just tier stakeholder packets and the Monday payload, and basically you you just like select an event and it.

Angela Chan   11:26
Yeah.
Mhm.

Joao Carvalho Rosa De Morais   11:41
It just does everything and then it goes like, what's the tiering result? What is the stakeholder packets and like what's the Monday payload and what's the actual request? And then what you can do is you can literally like customise the request here to see what changes in the in each of them. And what I think can happen is literally is literally something like this for the other.

Angela Chan   12:00
Wait, Sherry?

Joao Carvalho Rosa De Morais   12:05
Things as well, you know, like, what's the response that the that the user is gonna see depending on on like the the mock event, you know, because this one this one is just like the tiering and the stakeholder packets and the Monday payload, but we can also build this for the other deliverables.

Angela Chan   12:11
Okay.
Gotcha, yeah.

Joao Carvalho Rosa De Morais   12:23
So if you can just like mock what you think should be the output, I can implement it.

Angela Chan   12:23
Yeah, 'cause I...
Yeah.
Because I guess for me is basically I kind of treated it as like assuming this would be as like a chat bot essentially that a person would be using. So this is like, oh, like I, this, so they can write anything from like, oh, they like from they already finished the crib sheet and they uploaded that and then did they just want this tool to help them, you know, move forward from there.

Fernando Palo Del Mar   12:29
Okay.

Angela Chan   12:48
or just be like, hey, I have budgets to run an event. I don't know what to do, help me. And then it can help with the ideation as well. Like it, that's kind of where I, where I see it, kind of like a chat bot format, but I can give you like the rules and stuff that I think I've been creating. I think I can also, I could do like Wednesday, I feel like.

Joao Carvalho Rosa De Morais   12:58
Yeah.

Fernando Palo Del Mar   13:00
Yep.

Angela Chan   13:10
In the afternoon.
If that helps or the other thing is, I think because like if I'm not doing the coding technical stuff as much, I can get my portion done in terms of like the rules and like the processes outputs I envision and give all of those like PRD spec docs that I've crafted based on that to you guys by say like Wednesday when you guys meet to do this. So you have that too.

Joao Carvalho Rosa De Morais   13:33
Like, chew.

Angela Chan   13:33
****.

Joao Carvalho Rosa De Morais   13:34
Wednesday 10 and Wednesday 2 work for me.
Yeah, I mean, that's fine from my end as well, Angela. This, what I'm sharing, is just an example of something that I built. Like, assuming you already have like the event request, because that's like stream one and two of the technical work, like assuming you already have this, then.

Angela Chan   13:45
Got it.
When you say when we said when you you said already assume you already have what? Sorry.

Joao Carvalho Rosa De Morais   13:58
What happens afterwards?
Like, you assuming you already received like the full event details, because this was this what I built was just like after you have the event read, like how do you classify the tier? How do you build the stakeholder packets? How do you build the Monday mock payload? Those kind of things, you know, but then it would be it would be like the very important thing is like how is the user going to interact? What is the user going to see?

Angela Chan   14:11
Okay.
Okay.

Fernando Palo Del Mar   14:27
Yeah.

Angela Chan   14:27
Yeah, yeah.

Joao Carvalho Rosa De Morais   14:27
You know, and if you want, if you want to come to like claw design, I think it's a great idea. Yeah, claw design, yeah, yeah, yeah. **** you, skip intro. Like, you can, you, you can, you know, create the mockups here and you can tell, hey, this is exactly how I want it to look.

Fernando Palo Del Mar   14:35
Yeah, yeah.

Angela Chan   14:38
Yeah.

Fernando Palo Del Mar   14:39
Yeah.

Joao Carvalho Rosa De Morais   14:45
And then you can take, and then you can say, export this into a format I can feed Cloud Code or Codex, and then you know, and then there we already have everything that we want.

Angela Chan   14:54
Yeah, and at least that will be like, yeah, the cloud design. I think that later for the dashboard kind of look. I think the main thing I'm trying to figure out in terms of the specs right now is like the, yeah, because I'm assuming right now as a chat bot function. So then how does the chat bot actually like interact with the user when it pulls information and everything like that? And then basically.

Joao Carvalho Rosa De Morais   15:14
Like does it have to be a chat bot or could it be a form like?

Angela Chan   15:18
I'm thinking that's like the easier way to do it because like I think because of like how a lot of students

Fernando Palo Del Mar   15:19
Yeah, ****.
So, to go, you know.

Angela Chan   15:27
In terms of the, in terms of a lot of the back and forth that happens, like the Joe said, the pain point of like, he doesn't want to be the Wikipedia. When students reach out to him, he wants to be answering any of the useful questions. It's kind of like,
I I feel like that kind of was it was like what seemed to be like the made sense in terms of like it talks to it, and as you talk to the chat bot, it'd be like, hey, I have enough information to make the crib sheet for you. Do you want to just like download the crib sheet now and send it over then?

Fernando Palo Del Mar   15:40
Yeah.

Joao Carvalho Rosa De Morais   15:44
Okay. Okay.

Fernando Palo Del Mar   15:46
Yeah.

Joao Carvalho Rosa De Morais   15:53
Ah, okay, so it's going to have like the finance thing, it's going to have like all of the details. Okay, okay.

Fernando Palo Del Mar   15:54
Yeah, yes.
Yeah, the form is an output. Yeah, I think that the form.

Angela Chan   16:00
Yeah.
So, yeah, this will be that, but ideally.

Joao Carvalho Rosa De Morais   16:04
Yeah, yeah, yeah, okay, yeah, yeah.

Fernando Palo Del Mar   16:06
The form is necessary, but it's the output, because otherwise it just, yeah.

Angela Chan   16:08
Because when people go to the budget, yeah, go to the budget.

Joao Carvalho Rosa De Morais   16:11
Yeah, this, this, this is, this is the output like is a gigantic JSON.

Fernando Palo Del Mar   16:14
We are losing you, yeah, yeah.

Angela Chan   16:16
Yeah, yeah, because I think that's the thing when people go to like the preferred space and setups, like sometimes you go to that and you're like, I don't even know what are the options, right? And so that's kind of like the idea of like having something talk to you, like someone pulls the information to you when you as you need it, which is.

Joao Carvalho Rosa De Morais   16:26
Mhm, mhm.
Makes sense. And will you be able to send us the information of like the, the, all of the options, all of the finance codes, like where does that database live?

Angela Chan   16:33
Yeah.
So the finance code directly, it's already it's in that the LBS data URL, like it's in our all the data that I have, it's all it's all it's all shared. I think it's just like.

Joao Carvalho Rosa De Morais   16:55
Okay, so can you can you guide me? Just like...

Angela Chan   16:59
Yeah, in our shared folder.

Joao Carvalho Rosa De Morais   17:01
Yeah?

Angela Chan   17:01
the LBS data.
The short LBS did the last, the last thing, the last, the last one.

Joao Carvalho Rosa De Morais   17:07
Ah, okay, is the.

Fernando Palo Del Mar   17:12
Is this one that he gave access to you or not?

Joao Carvalho Rosa De Morais   17:14
Is this one? Is this one?

Angela Chan   17:16
This is this is all the all the LBS related information I have in terms of events across like everything.

Fernando Palo Del Mar   17:17
Yeah.

Joao Carvalho Rosa De Morais   17:22
Catering policy.

Fernando Palo Del Mar   17:23
Yeah.

Angela Chan   17:25
And the finance directory is one example of it. I think I keep on going for the finance directory because it's the most like self-explanatory one, because the other stuff kind of, you kind of need to figure out how to consolidate the data to make it useful. This one is pretty clean cut. If a club has done an event of the same name in the past,

Joao Carvalho Rosa De Morais   17:29
Wu.

Angela Chan   17:45
it keeps the same finance code. So for example, if like, like the whatever comp, like China Business Forum, so that one, if like someone was like going to our tool and they're saying, hey, I'm just trying to set up the next China Business Forum, the tool theoretically should already be able to spit out the finance code for them.
But then if it's like a new event, hey, I'm part of like the, whatever, like Wine and Spirits Club, we're doing a new event, then it should be able to say, realise that they've never done that event via the finance directory and say, hey, here's the space request form. By the way, also e-mail, let your club treasury know that you need to get a finance code for this event.

Fernando Palo Del Mar   18:08
The.

Joao Carvalho Rosa De Morais   18:17
Yeah.
So, basically, I think that the.
We're gonna build this as an, like, I think that, and this is like for the next steps, like for the MVP, I think that something with finance codes and rooms, I think that's enough, because I don't think this is the way that we want to serve the AI. Like, I don't think we want the AI to search on, like...

Angela Chan   18:42
Yeah.

Fernando Palo Del Mar   18:45
Yeah.

Joao Carvalho Rosa De Morais   18:51
Excel spreadsheets and like unstructured things, like it can, but I literally do not know if Codex can do that like really well. So I think that if we should have like a database of the finance codes and the database of the different spaces, and that will live in the ripple, and it will be able to search it.

Angela Chan   19:00
Say, if we can, if we can just...
Yeah.
Yeah.
Do this.

Joao Carvalho Rosa De Morais   19:12
It is going to be in a format that's better for each search.

Angela Chan   19:15
We can, we can do it based on the easy, the easy data stuff that we have, and so definitely finance code. And I think if we are able to use make the student toolkit, like that 100 page slide thing into like a database, essentially, that honestly would be just like, I think the strongest way to just lead into the rest of everything else. I know you have a PDF.

Joao Carvalho Rosa De Morais   19:35
Du.

Angela Chan   19:36
In your side, just chose the student, yeah, the event will get that. Yeah, because that's also like a huge portion of the ideation is that there's a lot of resources and like guidelines there to help someone just figure out like, why are you doing an event? How do you talk about like, it literally gives you like the phase zero of ideation.

Joao Carvalho Rosa De Morais   19:39
This one.
This one.

Angela Chan   19:55
And if we are able to like convert that into like how the chat bot can like guide someone, that's basically like most of the information that that's it. And the rest of it, like moving forward, V2, V3 of this product, but theoretically, is just, you just put more data from like the other stakeholders. Like how do people, how does Catering want to talk?
like people to talk to them, like we just, you know, you can feed in more of that data later on. But like this toolkit basically would be like our first example of how we can render that sort of information into data for the chat bot to use.

Joao Carvalho Rosa De Morais   20:28
Sounds really good. I think...

Fernando Palo Del Mar   20:28
Yeah, make sense, yeah.

Joao Carvalho Rosa De Morais   20:33
It's very clear right now for what we need to give access is like this is the final school and it's this basically is space, right? What are all spaces that they can use? Basically, for the zero, that's it, for the MVP. And I think it's clear if you can like then generate the.

Angela Chan   20:35
Okay.
Yeah.
Yeah.

Joao Carvalho Rosa De Morais   20:54
the requirements. In like plain text, really plain text, like the user has to interact with like a chat bot to be able to figure out this. The chat bot has to be able to search through these, these, and these to generate these details that must be in the encryption. Whenever the encryption is ready, it has to like give it to the student.

Angela Chan   20:58
Yeah.
Yeah.

Joao Carvalho Rosa De Morais   21:14
It has to also say, ohh, by the way, by the way, these are the other people that that you need to involve, and it should also like draught an e-mail, like all of those in like bullet points, like this is everything that needs to happen on the V zero. Enter. And then this is the thing that I already know that we need to do further on. So everything that we discussed today, like that we already know that we need to do in the future.

Fernando Palo Del Mar   21:24
Yeah.

Angela Chan   21:33
Mhm.

Joao Carvalho Rosa De Morais   21:38
And then for Fernando, what he's going to do is he's going to take your document, he's going to feed it to Codex, which is going to be up to date, and he's going to say, hey, by the way, what was already done, what wasn't, help me, like you chat with it, and you're going to say, by the way, I need to have like a clear, like next steps, like.

Angela Chan   21:38
Mhm.

Fernando Palo Del Mar   21:52
Yeah.

Joao Carvalho Rosa De Morais   21:57
help me with like the versioning, what should people building this in the future do? Like, and you're literally just going to generate text with it. You're not going to generate any code. The only reason you need to be connected to the repo is for it to be able to see what it does and what it doesn't do. And then, and then the output of your stream is going to be like a report. Like this is what already has been built. This is what's.

Angela Chan   22:03
Yin.

Fernando Palo Del Mar   22:07
Yeah.

Joao Carvalho Rosa De Morais   22:21
In the requirements, but wasn't built for some reason, and then, and then I can say why, and then what needs to happen in like different stages, and then we ask Rita to just transform all of that into like a pretty presentation, something that we can feed back to LBS and like an actual report, like what do you guys think?

Angela Chan   22:37
Yeah.

Fernando Palo Del Mar   22:37
Yeah.
Yeah, that's good. Sounds good.

Angela Chan   22:40
Yeah, I think that works, and then...

Joao Carvalho Rosa De Morais   22:41
We can meet at Wednesday or Thursday if you want, Fernando, to go over that if you want, but I mean, if you're just going to be chatting with...

Fernando Palo Del Mar   22:46
Yeah, yeah, what?
Yeah, no, no, for me, yeah, but for me, it would be good. Even if you suggested 10 A.m. or 2 P.m. from 2 to 3 for me would be great. Yeah, just like one hour if you were okay.

Joao Carvalho Rosa De Morais   22:59
Okay, I'm gonna, yeah, okay. Angela, not to put any pressure, but...

Angela Chan   23:01
I like to get myself not buying Yu.

Joao Carvalho Rosa De Morais   23:05
By when do you think you can have it? Like, literally, like by when?

Angela Chan   23:09
I can definitely get it done by like that time, like by that like Wednesday 2pm.

Joao Carvalho Rosa De Morais   23:09
Wu.
Okay.

Fernando Palo Del Mar   23:15
Yeah, and if you want, if you wanna join us, it's more than help, yeah, so yeah.

Angela Chan   23:19
Yeah, yeah, I should be able to also I should be able to join you guys. I should be able to like get things probably to you guys that morning and then I should probably also be able to join you.

Joao Carvalho Rosa De Morais   23:24
Okay, okay, so...
OK, the issue, the issue is that if you, if you give me by 2 PM, I will need like a few hours to have Codex build it, test it, and everything.

Fernando Palo Del Mar   23:29
Okay, great.

Angela Chan   23:36
I can do it Wednesday morning. I can give it to you by like Wednesday morning before I leave home basically.

Joao Carvalho Rosa De Morais   23:41
Yeah, it's okay. And so for me, the better time would be like Thursday at like 4, because then I would have had time to like build it.

Angela Chan   23:44
Uhh.
Let me see, or could I say I just let's I have two or two tomorrow evening? Is that better? 'Cause I, I...

Fernando Palo Del Mar   23:54
Yeah, for.
Yeah.

Joao Carvalho Rosa De Morais   24:02
Yeah, the I, what I'm saying is that I need like a day and a half more or less from the time I get it to the time that we can discuss it, because I would need to have it built already. Or no, or we can just discuss next steps. I mean, if you want to just discuss next steps, then we can do it at 10. We can do it at 10.

Angela Chan   24:03
Just in case, if yeah.

Fernando Palo Del Mar   24:16
No.

Angela Chan   24:19
Okay, I thought I was and I was also saying working like working on it as well like as also having it as a working meeting.

Joao Carvalho Rosa De Morais   24:26
Okay, okay, okay. Working meeting, okay.

Fernando Palo Del Mar   24:26
Yeah.

Angela Chan   24:26
Oh.

Fernando Palo Del Mar   24:28
It's a working meeting, it is.

Joao Carvalho Rosa De Morais   24:29
Makes sense.

Angela Chan   24:29
But...
I think I want to try to give it to you like tomorrow evening, like tomorrow before 5. But for sure, like I can get it. I can get you something before like.

Joao Carvalho Rosa De Morais   24:31
Okay.
Okay.

Angela Chan   24:42
Like just like Wednesday morning, like Wednesday 11 before, like Wednesday 11.

Joao Carvalho Rosa De Morais   24:48
Okay, so should we book Wednesday at 2?

Fernando Palo Del Mar   24:52
Yes, and I just tried to look for a room here and so any place here or or in front here, is it OK?

Angela Chan   24:52
Yeah.
Yeah.

Fernando Palo Del Mar   25:04
Yeah, and I just want to try to to find a room here, so as I'm just connected here, it's fine.

Angela Chan   25:09
Yeah, I may actually, I may or may not be on campus on Wednesday, but I will be online if not.

Joao Carvalho Rosa De Morais   25:15
Fernando, you're appearing as unavailable in Wednesday at 2, but I'm going to send it anyway.

Fernando Palo Del Mar   25:19
Yeah, no, no, it's okay because I have a meeting at 3, so I just felt like I was not sure you were gonna be here before or not, so just like to commute, so it's okay, but just...

Angela Chan   25:20
Yeah.

Joao Carvalho Rosa De Morais   25:30
Okay.

Fernando Palo Del Mar   25:30
At 3 at 3 AM. OK, I'm just looking for a room if you live nearby here, so it's great to to be together, Angela, and Angela, she can connect. OK.

Joao Carvalho Rosa De Morais   25:38
Mhm.

Angela Chan   25:40
Yeah.

Joao Carvalho Rosa De Morais   25:41
Yeah, I have calls before and after, so I don't know if I'm going to be in campus because I usually...

Fernando Palo Del Mar   25:46
Okay, that is fine. Okay, so let's try to be group meeting too, and we can share, we can share screens and it's fine.

Angela Chan   25:48
****.
Sounds good.

Fernando Palo Del Mar   25:58
Okay, that's good.

Joao Carvalho Rosa De Morais   25:58
Sounds good. Okay, okay.

Angela Chan   26:01
All right.

Fernando Palo Del Mar   26:02
Good.

Joao Carvalho Rosa De Morais   26:03
Good. Okay.

Fernando Palo Del Mar   26:03
OK, now, now, now I'm more comfortable. OK, that's fine. I just like expressing.

Joao Carvalho Rosa De Morais   26:06
Yeah.

Angela Chan   26:07
Yeah, yeah, I will see if, after like Fernando, if you have any questions after you look through the event, the the life cycle document, feel free to ask. I think that one should give you a lot of context, at least to start with, to catch up.

Fernando Palo Del Mar   26:15
Yes, let me check.
Yeah, yeah, no, that's fine, and I think that'll be good, like when just connecting what the professor said today, and it just like the part that we're gonna be sharing, the share is one to three, and just the thing about one of the topics that we say, I think that will be like a really good delivery.

Angela Chan   26:23
Yeah.
Yeah.

Joao Carvalho Rosa De Morais   26:36
Good.

Fernando Palo Del Mar   26:36
And potentially in the future, they'll be reaching you as well for doing a lot of those topics. So there's a lot to, yeah.

Angela Chan   26:36
Yeah, but...

Joao Carvalho Rosa De Morais   26:42
Exactly, you know, I'm doing this, I'm doing this exclusively for putting my CV.

Angela Chan   26:42
****.
Oh yeah, 100%. 100%.

Fernando Palo Del Mar   26:47
Yeah, yeah, but it's a lot of work. It would be good for LBS now if they continue this, yeah.

Joao Carvalho Rosa De Morais   26:49
Okay.
Yeah.

Angela Chan   26:52
Not.

Joao Carvalho Rosa De Morais   26:54
OK, thanks guys. I need to grab lunch. Bye bye.

Angela Chan   26:54
Okay.
****.

Fernando Palo Del Mar   26:57
Bye-bye.

Angela Chan   26:57
I...

Joao Carvalho Rosa De Morais stopped transcription
