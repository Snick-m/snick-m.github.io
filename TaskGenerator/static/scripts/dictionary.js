const verbs =
`
Play
Make
Set
Watch
Take
Find
`.trim().split('\n').map((text) => text.split(";"));

const subjects =
`
Football;Cricket;Video Game;Badminton
a Drawing;a Paper Boat;some Music;a list of Things to Do;a Cake;an Omlette;a Story
the Mood;your Bed;the Room;the Table;up some Tents;up a new Phone Wallpaper;up some RGB Lights
an old Movie;a new Movie;a TV Series;some Birds;the Nature;Cartoons;YouTube Videos
out the Trash;your partner on a Date;a look at Yourself
a game to Play;fun topics using Google;a Life
`.trim().split('\n').map((text) => text.split(";"));

const extensions =
`
with a Bottle;while Dancing;with some Paper;and Eat Kacchi
about History;while Singing;and take a Shower;while eating Kacchi
with a cup of Coffee;with a bucket of Chicken Fries;and roast Marshmallows;go out for Kacchi
and make Soup;while Baking;for an Hour
with your Siblings; while Singing
`.trim().split('\n').map((text) => text.split(";"));