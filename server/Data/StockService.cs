using server.Models;
namespace server.Data
{
  public class StockService
  {
    private readonly List<StockItem> _stockItems = new()
    {
      new(1, 20, 21345, "Warehouse A"),
      new(2, 53, 35214, "Warehouse B"),
      new(3, 12, 12345, "Warehouse C"),
      new(4, 8, 67890, "Warehouse A"),
      new(5, 33, 13579, "Warehouse B")
    };

    public List<StockItem> GetAll()
    {
      return _stockItems.ToList();
    }

    public StockItem? GetById(int id)
    {
      return _stockItems.FirstOrDefault(item => item.Id == id);
    }

    public void Add(StockItem item)
    {
      item = item with { Id = _stockItems.Count + 1 };
      _stockItems.Add(item);
    }

    public void Update(StockItem updatedItem)
    {
      int index = _stockItems.FindIndex(s => s.Id == updatedItem.Id);
      if (index != -1) // Check if item exists
      {
        _stockItems[index] = updatedItem; //FIX - maybe change from record to class
      }
      else
      {
        throw new Exception("Item not found");
      }
    }


    public void Delete(int id)
    {
      var existingItem = _stockItems.FirstOrDefault(s => s.Id == id);

      if (existingItem != null)
      {
        _stockItems.Remove(existingItem);
      }
      else
      {
        throw new Exception("Item not found");
      }
    }
  }
}