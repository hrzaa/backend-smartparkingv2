import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { mkdirSync } from "fs";

const prisma = new PrismaClient();

const folderPath = path.resolve("src", "public", "img", "parkings");

try {
  mkdirSync(folderPath, { recursive: true });
  console.log(`Directory created successfully at ${folderPath}`);
} catch (err) {
  console.error(`Error creating directory: ${err.message}`);
}

const deleteAllImages = (folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      fs.unlinkSync(filePath);
    }

    console.log("Semua gambar dihapus berhasil.");
  } catch (error) {
    console.error(`Gagal menghapus gambar: ${error.message}`);
  }
};

const getAllParkingAreas = async (req, res) => {
  const parkingAreas = await prisma.parkingArea.findMany({
    orderBy: { name: "asc" },
    include: {
      parking_spaces: {
        orderBy: { space_name: "asc" },
      },
    },
  });

  res.json(parkingAreas);
};

const getAllParkingSpaces = async (req, res) => {
  const parkingSpaces = await prisma.parkingSpace.findMany({
    orderBy: { space_name: "asc" },
  });

  res.json(parkingSpaces);
};

const updateParkingAreas = async (req, res) => {
  const parkings = req.body;

  await prisma.parkingArea.deleteMany();
  deleteAllImages(folderPath);

  for (const data of parkings) {
    await prisma.parkingArea.create({
      data: {
        id: data.id,
        name: data.name,
        img: data.img,
        img_url: `${req.protocol}://${req.get("host")}/img/${data.img}`,
        location: data.location,
      },
    });

    for (const item of data.space_names) {
      await prisma.parkingSpace.create({
        data: {
          parking_area_id: data.id,
          space_name: item,
        },
      });
    }
  }

  res.status(201).json(parkings);
};

const updateParkingSpaces = async (req, res) => {
  const parking_spaces = req.body;

  for (const data of parking_spaces) {
    await prisma.parkingSpace.update({
      where: { space_name: data.space_name },
      data: {
        status: Boolean(data.status),
      },
    });
  }

  res.status(200).json(parking_spaces);
};

const updateParkingImages = async (req, res) => {
  const form = formidable({
    multiples: false,
    uploadDir: folderPath,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      return part.originalFilename;
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const image = files.image[0];
    await prisma.parkingArea
      .update({
        where: { id: req.params.id },
        data: {
          img: image.originalFilename,
          img_url: `${req.protocol}://${req.get("host")}/img/parkings/${
            image.originalFilename
          }`,
        },
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  });
};

const deleteAllParkingAreas = async (req, res) => {
  try {
    await prisma.parkingArea.deleteMany();
    deleteAllImages(folderPath);
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  getAllParkingAreas,
  getAllParkingSpaces,
  updateParkingAreas,
  updateParkingSpaces,
  updateParkingImages,
  deleteAllParkingAreas,
};
