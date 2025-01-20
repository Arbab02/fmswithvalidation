import clientPromise from "@/lib/mongodb";
import connectToDatabase from "@/lib/mongodb";
import Deal from "@/lib/models/Deal";


// Fetch deals (all or by ID)
export async function GET(req) {
    try {
      await connectToDatabase();
      const url = new URL(req.url);
      const id = url.searchParams.get("id"); // Get the `id` from query params if provided
  
      if (id) {
        const deal = await Deal.findById(id);
        if (!deal) {
          return new Response(JSON.stringify({ error: "Deal not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(deal), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const deals = await Deal.find(); // Fetch all deals
      return new Response(JSON.stringify(deals), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching deals:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch deals" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  export async function POST(req) {
    try {
      await connectToDatabase();
      const data = await req.json(); // Parse JSON body
      console.log("Received data:", data); // Log the incoming request data
  
      const deal = new Deal(data); // Create a new deal
      await deal.save(); // Save to database
      console.log("Saved deal:", deal); // Log the saved deal
  
      return new Response(JSON.stringify(deal), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error in POST /api/deals:", error); // Log the error
      return new Response(JSON.stringify({ error: "Failed to create deal" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  // Update an existing deal
  export async function PUT(req) {
    try {
      await connectToDatabase();
      const data = await req.json(); // Parse JSON body
      const { id, ...rest } = data; // Extract the `id` and other fields
  
      const updatedDeal = await Deal.findByIdAndUpdate(id, rest, { new: true }); // Update the deal
      if (!updatedDeal) {
        return new Response(JSON.stringify({ error: "Deal not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(JSON.stringify(updatedDeal), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error updating deal:", error);
      return new Response(JSON.stringify({ error: "Failed to update deal" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  // Delete a deal
  export async function DELETE(req) {
    try {
      await connectToDatabase();
      const { id } = await req.json(); // Parse JSON body for `id`
  
      const deletedDeal = await Deal.findByIdAndDelete(id); // Delete the deal
      if (!deletedDeal) {
        return new Response(JSON.stringify({ error: "Deal not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(null, {
        status: 204,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error deleting deal:", error);
      return new Response(JSON.stringify({ error: "Failed to delete deal" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }