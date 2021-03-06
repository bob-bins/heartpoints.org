# Github

Heartpoints uses Github as a [version control system](https://en.wikipedia.org/wiki/GitHub). 

There is a [heartpoints organization](https://github.com/heartpoints) with information about the Heartpoints 
organization, [Members](https://github.com/orgs/heartpoints/people), who may work on various version controlled  
assets for the Organization, [Repositories](https://github.com/heartpoints), where various software and other digital
assets are officially stored and controlled as they change over time, and other features and capabilities.

# Heartpoints.org Repository

The repository containing this help document is the [heartpoints.org](https://github.com/heartpoints/heartpoints.org) 
repository. It contains not only the various software assets (source code files, images, videos, this documentation 
itself), but it also contains [issues](https://github.com/heartpoints/heartpoints.org/issues) - a list of categorized
bugs, feature ideas, to-dos, etc. which sometimes also appear, along with less formal "notes", in the repository's
[project board](https://github.com/heartpoints/heartpoints.org/projects/1), where we try to organize our "current
focus" into columns representing things we are about to do, currently doing, or have recently completed.

## Finding and working on a Github Issue

For a left-to-right issue board view, visit 
[github.com focus board](https://github.com/heartpoints/heartpoints.org/projects/1)

To view issues from terminal, run:

    ./hp hub issues

To browse to issues master list on the web (different than the left-to-right project view), run:

    ./hp hub browse -- issues

To create a new issue from command line:

    ./hp hub issue create -m "description of issue here"

## Create and manage branches

When working on a particular github issue, it is best to do so in a particular branch. Ideally the name of the branch
ties back to the issue.

To create an issue and make a branch at the same time:

    ./hp createIssueAndBranch "description here"

To create a branch for an already existing issue:

    ./hp branch <issueId>

### Verifying you are in the right branch

Verify you are working within the new branch. Do do so, run:

    git status

### Short Lived Branches!

We want branches to be short lived! No long running branches - get that stuff into master and if its not ready put it
behind a feature switch so other devs can see it and it doesn't get lost or forgotten. Otherwise, delete it!

### Keep Branches Up-To-Date via REBASE (MERGES DISALLOWED!!!)

Branches may not be merged to origin/master from a pull request unless the pull request commits are *properly 
rebased*, please see [this video tutorial](https://www.youtube.com/watch?v=tukOm3Afd8s) or find a similar one to
understand the procedure. Use the following command:

    git pull --rebase origin master

### Merge conflicts if necessary

If your changes conflict with the changes you are pulling in, your rebase will not succeed and git will notify you
of conflicts. You can use `git status` to understand what is conflicting, and resolve the conflicts in those files.

When ready, you may `git add -A` to add the files whose conflicts you have resolved, and then once all conflicts have
been resolved, you may run `git rebase --continue` to continue the rebase. 

IMPORTANT: Do not commit accidentally in the middle of a rebase!

### Pushing rebased / non-rebased changes to a branch / pull request

The repository settings will prevent unrebased pull requests from merge, enforcing this best practice for everyone.

If you see the message "This branch is out-of-date with the base branch" then you will need to rebase (see above).

IMPORTANT: DO NOT CLICK THE "Update branch" BUTTON AS IT WILL DO A DIRTY NON-REBASED MERGE

If you receive an error after attempting a push, such as...

    error: failed to push some refs to 'git@github.com:heartpoints/heartpoints.org.git'

you are about to overwrite a remote branch, with its own history of commits; with your
local version of that same branch, which has a different history.

As long as you intend to replace the remote branch's history with your own, then you may
override this error by running `git push origin head --force-with-lease`. As long as you
have recently fetched from the remote, your changes will override the remote. Don't worry,
in a catastrophe, those changes are still recoverable.

WARNING: If you did not recently rebase, but you did receive this error, then you should
be worried. Double check that you are in the branch you think you are in, and that you're
attempting to push to the correct place. Have you already rebased in the latest changes? Double
check everything before force pushing!!!

### Manually Creating a Branch (not recommended)

Follow [these instructions](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)
to create and move to a new branch on your local machine.


## Add and commit Changes to current branch

When you believe your changes are ready, add them to the git workspace with

    git add -A

and then commit them with

    git commit -m "brief description of change"

you may also commit using the description for your branch's github issue:

    ./hp commitUsingIssueDescription
    
alternatively, a shorthand for the above:

    ./hp c

## Pushing Changes from local branch to remote branch of the same name

and push them with

    git push origin head

## Creating a pull request

Finally, navigate to github.com/heartpoints/heartpoints.org, and look for the prompt to create a new pull request 
from your newly pushed branch. Here, you can review your changes and if things look good, add any potential code 
reviewers in the upper right, add an optional explanation in the text box, and click "Create pull request"

You may also pull request using the following:

    `./hp hub pull-request`

You will be taken to the newly created pull request page.

## Automatic Build and Test for Pull Requests
On the newly created pull request page, on the "Conversations" tab, near the bottom, there is a "Checks" section.
In this section you can see your pull request is automatically tested by the development pipeline. Look for the 
"Status" or "Details" links on the "Conversation" tab of the pull request to understand what automatic testing jobs 
are running, and whether they passed or failed (you will see a yellow circle for running, green check for passing, 
red x for failing)

## Merge to Master with Automated Production Deployment & Verification

Once you have passing jobs with green checks and at least one review signoff from a colleague, then, assuming you 
have the latest changes incorporated into your branch, you will be ready to merge! Click "Squash and Merge" to squash 
your commits into a single commit for the pull request as a whole, and merge that into master. (If the words "squash 
and merge" are not visible on the button, click the down arrow and refine your selection to say squash and merge, 
then click).

At that point, the pipeline will automatically build, test, deploy, and production verify your change. Master merge 
pipeline jobs can be viewed [here](https://circleci.com/gh/heartpoints/heartpoints.org/tree/master). You may also 
find this link from github by navigating to the "commits" tab of the main repository page, and clicking the small 
green / red / yellow status icon near your merge commit, and following the link.

You can validate your change has made it to production by using the chrome developer tools to inspect the http 
response headers, looking for the `commitSha` header, which should match the sha of your merged PR commit in master.

## Shortcut for Getting Changes to a PR

To add your local changes to the workspace, commit them using the message that was used to create
your branch / github issue, push them to your remote branch, and then generate a pull request,
all as one step, run:

    ./hp addCommitPushAndPullRequest