const { db } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await db.sync({ force: true });
  });

  test("can create a Band", async () => {
    const testBand = await Band.create({ name: "Bilal", genre: "Dubstep" });
    expect(testBand.name).toBe("Bilal");
  });

  test("can create a Musician", async () => {
    const testBand = await Musician.create({
      name: "Bilal",
      Instrument: "obo",
    });
    expect(testBand.name).toBe("Bilal");
  });

  test("can create a Song", async () => {
    const testSong = await Song.create({
      title: "Bilal",
      year: 1998,
      length: 25,
    });
    expect(testSong.length).toBe(25);
  });

  test("can update a Band", async () => {
    const testBand = await Band.create({
      name: "Bilal",
      genre: "Dubstep",
    });

    const updatedBand = await Band.update(
      { genre: "Classical" },
      { where: { id: testBand.id } } // Specifying the condition for updating
    );

    const fetchedBand = await Band.findByPk(testBand.id);

    // 4. Assert the updated values
    expect(updatedBand[0]).toBe(1); // Expecting one row to be affected
    expect(fetchedBand.genre).toBe("Classical");
  });

  test("can update a Musician", async () => {
    const testMusician = await Musician.create({
      name: "Bilal",
      instrument: "obo",
    });

    const updatedMusician = await Musician.update(
      { instrument: "Triangle" },
      { where: { id: testMusician.id } } // Specifying the condition for updating
    );

    const fetchedMusician = await Musician.findByPk(testMusician.id);

    // 4. Assert the updated values
    expect(updatedMusician[0]).toBe(1); // Expecting one row to be affected. .update returns array with first element representing rows affected.
    expect(fetchedMusician.instrument).toBe("Triangle");
  });

  test("can delete a Band", async () => {
    // 1. Create a test Song
    const testBand = await Band.create({
      name: "Bilal",
      genre: "Dubstep",
    });

    // 2. Delete the test Song
    const deletedBand = await Band.destroy({
      where: { id: testBand.id }, // Specify the condition for deletion
    });

    const fetchedBand = await Band.findByPk(testBand.id);

    // 4. Assert that the Song is deleted
    expect(deletedBand).toBe(1); // Expecting one row to be deleted
    expect(fetchedBand).toBeNull();
  });

  test("can delete a Musician", async () => {
    // 1. Create a test Song
    const testMusician = await Musician.create({
      name: "Bilal",
      instrument: "Obo",
    });

    // 2. Delete the test Song
    const deletedMusician = await Musician.destroy({
      where: { id: testMusician.id }, // Specify the condition for deletion
    });

    // 3. Try to fetch the deleted Song from the database
    const fetchedMusician = await Musician.findByPk(testMusician.id);

    // 4. Assert that the Song is deleted
    expect(deletedMusician).toBe(1); // Expecting one row to be deleted
    expect(fetchedMusician).toBeNull(); // Expecting the fetchedSong to be null
  });
});
