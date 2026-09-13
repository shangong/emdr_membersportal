# Meeting @Today 4:07 PM

Summary

### Action Items

- [ ]  Melissa to send pictures (profile pictures, cube/tier designs) for integration into the membership portal
- [ ]  Provide the EMDR journal URL to be added to the specifications document for the resources link
- [ ]  Decide on PayNow payment automation vs. manual verification
- [ ]  Add SMTP configuration to the admin config file with self-service password update for email accounts
- [ ]  Designs to be added to the requirements document at a later stage

---

### System Overview

- Two distinct systems are being built:
    - **WordPress website** — separate and distinct from the portal
    - **Custom-built Membership CRM Portal** — the focus of this meeting
- Current membership is ~130 members and growing

---

### Member Portal Features

- **Member profile** — members can log in and upload certificates of trainings attended
- **Digital membership card** — includes membership ID and a QR code for easy attendance taking
- **Certificate generation** — customizable certificate templates linked to specific trainings or peer learning events; certificates are auto-generated and sent to the member's account upon course completion
- **Application forms** — three distinct forms identified:
    - Training / course registration form (fields to be populated dynamically from live courses list)
    - Membership renewal form
    - Application to be a certified EMDR practitioner form
- **Event registration** — members can sign up for peer learning events and networking events; some events require filling in particulars and payment
- **Resources link** — a menu bar link labelled "Resources" that opens the EMDR journal website in a new window; URL to be provided separately
- **Email reminders** — requires SMTP integration; SMTP credentials to be stored in a config file and editable by admins via an admin settings page
- **Member dashboard** on login:
    - Auto-generated carousel of latest new courses and events (no manual design work required)
    - Optional marketing banner: if a banner image is uploaded to a specific event or course, it is displayed at the top

---

### Payment Features

Features that require payment processing:  

- Course registration
- Event registration
- Membership renewal
- **Current payment method:** PayNow QR code (manually verified by a staff member)
- **Payment automation:** technically possible; to be decided by the association

---

### Membership Tiers

Five tiers exist; all members (regardless of tier) are permitted to access all portal features including events and courses — eligibility per course is governed by admin/EXCO approval, not a hard system restriction:    

| **Tier** |
| --- |
| Associate |
| Ordinary |
| Full |
| Overseas |
| Honorary |
- Membership tier cube/badge designs to be supplied by Melissa and integrated into the portal

---

### User Roles & Admin Portal

- Three role levels: **Root admin**, **Editor (EXCO)**, and **Member**
- Admin and member dashboards are distinct views of the same portal
- **Admin management dashboard** should include:
    - Course and event creation tools
    - Pending approvals (e.g., certification applications)
    - Overview statistics (number of courses, signups, etc.)
- Admin approval workflow: members apply for courses or certifications via the portal → application sent to admin → approved → certificate auto-issued to member

Notes

Transcript

Hi Notion, please start to take down notes. This is about a membership system for EMDR and Melissa will be starting to talk about all the various features. Please concisely write it down. List all the features which she mentioned down and after that, start to think about how to build all these different features and how it actually gets built out. There are two different systems that she's talking about today.

Membership CRM and a website. Both are distinct and different. The website will be totally distinct and separate and will be created using WordPress. This membership system however, I would like it to be custom built. Please listen to her now. She's going to describe the features of the membership portal.

Okay, so this membership CRM portal, we're looking at, it's like a back-end management association system. We currently have more than 100 members, so it's about 130 odd, it will be increasing. We want this system, like our members to be able to log in and do membership things. So meaning they have their own profile where they can upload certificates of trainings that they've attended. It will be nice if they have like a digital membership card that

They have their membership ID so that can be on the card and then maybe like a QR code that you know they can scan so it's easy for attendance taking. They will also need to have access to the EMDR journal. We want a feature where it's easy to help members apply to be certified as an EMDR practitioner or a renewal of their membership. That they can just fill in a form that will be in the portal. and then they can just upload the relevant certificates, they can pay for it, and then the application will be sent to an admin person for approval, and then once approved, then the certificate can be sent to the member all on the portal itself.

On the portal, that means it's within the portal? Yeah.

Within the portal itself.

Then the certificate will be... It's supposed to be rendered, is it?

Rendered means what?

So that means if you go for the course and then they finally finish the course, then you click one button, the course will generate, the certificate will be generated because of the course, right?

Yeah.

And then it will be sent to their account. the account which they used to sign in within that thing, correct?

Yes. So it would be good if, like, you know, like, there are customisable, you know, these kind of forms, like, these customisable certificates so that we can sort of prepare it, like, beforehand and then link it to, like, the specific, either the peer learning event or the trainings because we run repeated trainings across the years so we won't need to constantly come up with, like, a new format of forms.

So not really forms right? When you use the word forms, what do you mean by that?

Forms will be more like the application forms, I guess. Registration forms.

For courses?

Yeah, for courses.

So that means courses can be, that means for the courses, it can actually require different types of, different inputs. Because some some courses are basic so they do not require a certain input some courses They are more sophisticated. So they require a few more inputs, right? That the members will have to key in specific details about themselves Is it? Because the word forms is The web forms you you should think of Google Forms and Google Forms you can create many different fields actually.

Yeah Yeah, but then in this case is are you requiring different forms?

I think we have some

training application form pretty much have quite similar fields then can you actually list down the fields because if that's the case because it makes more sense that when somebody is required to fill in information to join a course Especially an EMDR course, many different EMDR courses, it should actually require the exact same pieces of information. And then after it requires the exact same pieces of information, then maybe actually some things should be placed into the notes.

the the cosmos why like what kind of information maybe the lecturer the speaker speaking trainer requires certain things you know this particular trainer is interested to collect a certain piece of information and that's where these notes yes this information will be placed into the into the cosmos so which means this form is For this particular fail, you can tell them please write all these things in the course notes in the application form.

Don't know what you're talking about. That's why this one later can not.

So you see, because when you talk about many many different types of forms and stuff like that, you have to be very specific.

I know, I'm trying to. So you wait. So there's training application form, there is renewal of membership form, there's like application to be a certified EFDR practitioner form.

Okay, so as you can see, actually what she means by forms, they are just different functions.

Which has different fields lah.

So all these various different functions yeah, so actually No, no you so what not so many different forms three different forms and for the cost form You might have to It has to be populated from the from the courses which are created Yeah, one of the fields will be which costs are Are they trying to register for? Enroll for right and then this has to be taken from the courses The courses List the list of courses which is created at the moment the live courses.

Okay any others?

It will be nice if there's a customizable form whatever that we can change to create i'm getting irritated okay it'd be nice if we can have customizable like event creation I hate the word form now, seriously. Form!

It's an online form, I understand. But I don't actually know what you're talking about.

This vendor is so irritating. So rude, eh, really.

Keep your comments to yourself. We are having a professional meeting. I'm only asking you clarification points. Okay? Because AI requires all these clarification points. We are collecting business requirements

So we organize certain events like certain peer learning events or networking events maybe. So it's...

And those are just events ah? Yes? So I know you require this... You require some... You require a form which you can add in information on the events.

and then can broadcast it to all the members in the database.

So basically it's just a link where almost like a Google form which only has one field to say, yes, I'm attending. No, I'm not attending. Something like meetup.com. You have all the pieces of information on the event and then that's it.

No, they have to fill in the particulars and pay.

So some events might have payment schemes. Okay, so how are you planning to pay? To process the payments?

For now, we generally use PayNow QR code.

PayNow? So somebody, a human being, squirrel have to check it, is it?

Yeah.

Okay. Do you want to automate the PayNow system?

Like what? What do you mean?

There is a way to automate PayNow. So there is a way to actually check whether or not the payment has been made. So this is the only more difficult one. Yeah. So far everything you have said, AI can do it within maybe five hours? Yeah. So far, everything you have mentioned, I can think of using render. So, AI, Notion, please add into the meeting notes that which are the events or rather which are the features which requires payments.

Can you say again? Courses require payments? Events require payments? Anymore? Renewal of membership requires payments.

Any more features?

Can be a bit more organized actually. I'm asking Notion to make it a bit more organized.

So email reminders, simple.

Okay, so email reminders will require SMTP integration. So we will actually, please put this into the config file. Then the SMTP details and then we'll make it easy for them to actually configure themselves when they themselves change their own system passwords. The system password for the email accounts so that they can actually change it themselves through an admin page or something like that. Anymore?

So that's like the member portal right? Then we have admin portal right? Where the EXCO people

and look at it just to see like you know like all the pending things okay so um so basically how i see it is you have the exact same portal and then members log in to this portal and see one set of things administrators um so we'll require uh we will require an a user page where the different rights are given to administrators and they have their own EXCO group where the administrator and the editor rights be given to them.

So one root user and then many different editor users and then a member user. Is there any others apart from member users? So that means lower than member user. This user, they register themselves for example, but then they cannot sign up to anything. Are there these kind of users?

We have different membership tiers.

Yeah, okay, so no different membership. I wonder whether you got the point on membership tiers.

Did you say membership tiers just now? I think I got it. I can say what are the membership tiers.

Maybe you can talk about the membership tiers and what is the difference between the membership tiers.

Okay. Okay. We have different membership tiers. Leave me alone. Okay, so we have different membership tiers. We have associate membership. These are members who have attended trainings on EMDR but these trainings are not approved by EMDR Singapore or they are just in the process of completing weekend one of the EMDR Singapore approved EMDR training. And then we have another membership here that's called the ordinary membership.

This is for everybody who have completed at least weekend one of an approved EMDR basic training. And then the next membership here is a full membership. This tier is open to persons who have completed all requirements of the EMDR Singapore approved basic training. which is weekend one and weekend two plus consultation hours. And full members can enjoy all the membership privileges, basically. We also have overseas membership tier, which is open to people who qualify for membership on either of the above three tiers but are not residing in Singapore.

And then we have honorary membership.

Can you tell us specifically how all these different membership tiers affect what they can do on the system? Is there some of them who can register for events, can't register for courses, things like that?

So these are course specific. There are some courses that are only open to... Members who have completed basic training which means it's either the full membership here or the or some of the associate members So it depends So which means there's no rule, correct?

So in a sense every single member can actually go for events, can go for courses, can go for everything. They should be allowed access to all this, correct?

They are allowed... This is where the Xcode approval comes in. So they can apply.

So that means yes. No iffy things. So it means that all members are allowed to access every single thing on the portal except the administrator's functions. Administrator functions will include things like creation of everything, course creation of events and all those other things. So administrator portals should also create a management dashboard where number of courses, number of signups and everything and all these features like this are present.

When admin users log in the the management dashboard page should be different from the membership pages. So what should members see when they log in? They should see the latest events and stuff like that, right? Because that makes sense. Latest events, latest courses, maybe an updates banner, something like that. Okay, so for membership dashboards, what we should put there is a banner. So the banner, that would be tough because then we will require them to design it.

So maybe just a carousel of the latest new things. New courses, new events, new something. So this should be automatically generated so that they do not need to be they do not need to do any designs, design work. And then and one thing should which can be shown is a banner, for example. So if they do create any banners to put off on the on on the design work, yeah, any banner for for the design work for a particular event for example, some marketing collateral which they create and they upload on the specific event for example, then that should be shown on top of it.

Apart from that, the members should be allowed to actually just go straight into the events and register event or course or whatever register for them okay anything else so this is this are featured this feature list okay what i'm talking to you when i ask you all these details it's not way none either oh yeah correct one more thing um the i will provide pictures of different things for to for you to to you okay um

Take for example, they have this cube version of their membership tier and some cube pictures. Of course, there are profile pictures but after that there are some cube designs. So we will integrate this into the system. Anymore?

And maybe like a What's that? A field? No. Like a button called resources that just links to the EMDR journal.

Okay, no. Cancel that. It's a resources page where it is an EMDR journal. The EMDR journal will be part of the website. So basically, it is just a link in the menu bar. So this is a resources link in a menu bar. That's about it. Hyperlink out. Open a new window into some link which I will send you. This will be specified in the specifications.

Anything else?

Okay, so designs will be added to this document in a later stage. Thank you.