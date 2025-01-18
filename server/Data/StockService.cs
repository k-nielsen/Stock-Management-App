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

    public StockItem GetById(int id)
    {
      var item = _stockItems.FirstOrDefault(item => item.Id == id);
      if (item == null)
      {
        throw new Exception("Item not found");
      }
      return item;
    }

    public void Add(StockItem item)
    {
      item = item with { Id = _stockItems.Count + 1 };
      _stockItems.Add(item);
    }

    public void Update(StockItem updatedItem)
    {
      var index = _stockItems.FindIndex(item => item.Id == updatedItem.Id);
      if (index == -1)
      {
        throw new Exception("Item not found");
      }
      _stockItems[index] = updatedItem;

    }


    public void Delete(int id)
    {
      var existingItem = _stockItems.FirstOrDefault(item => item.Id == id);
      if (existingItem == null)
      {
        throw new Exception("Item not found");
      }
      _stockItems.Remove(existingItem);
    }
  }
}