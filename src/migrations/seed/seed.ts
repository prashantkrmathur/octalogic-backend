import { connectionSource } from "src/config/typeorm.config";
import { Vehicle } from "src/entities/vehicle.entity";
import { VehicleCategory } from "src/entities/vehicle_category.entity";


async function seed() {
  await connectionSource.initialize();

  const categoryRepo = connectionSource.getRepository(VehicleCategory);
  const vehicleRepo = connectionSource.getRepository(Vehicle);

  // Create categories
  const categories = categoryRepo.create([
    { name: 'Hatchback', wheelCount: 4 },
    { name: 'SUV', wheelCount: 4 },
    { name: 'Sedan', wheelCount: 4 },
    { name: 'Cruiser', wheelCount: 2 },
  ]);
  await categoryRepo.save(categories);

  // Add vehicles
  const hatchback = categories.find(c => c.name === 'Hatchback');
  const suv = categories.find(c => c.name === 'SUV');
  const sedan = categories.find(c => c.name === 'Sedan');
  const cruiser = categories.find(c => c.name === 'Cruiser');

  const vehicles = vehicleRepo.create([
    { modelName: 'Maruti Swift', category: hatchback },
    { modelName: 'Hyundai Creta', category: suv },
    { modelName: 'Honda City', category: sedan },
    { modelName: 'Royal Enfield Classic', category: cruiser },
  ]);
  await vehicleRepo.save(vehicles);

  console.log('🌱 Seed data inserted successfully!');
  await connectionSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error while seeding data:', err);
  connectionSource.destroy();
});
