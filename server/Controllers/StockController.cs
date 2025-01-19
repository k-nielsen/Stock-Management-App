using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class StockController : ControllerBase
  {
    private readonly StockService _stockService;
    public StockController(StockService stockService)
    {
      _stockService = stockService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<StockItem>> GetAll()
    {
      return Ok(_stockService.GetAll());
    }


    [HttpGet("{id}")]
    public ActionResult<StockItem> Get(int id)
    {
      try
      {
        var item = _stockService.GetById(id);
        return Ok(item);
      }
      catch (Exception ex)
      {
        return NotFound(ex.Message);
      }
    }

    [HttpPost]
    public ActionResult Create(StockItem item)
    {
      _stockService.Add(item);
      return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public ActionResult Update(int id, StockItem updatedItem)
    {
      if (id != updatedItem.Id)
      {
        return BadRequest("Id mismatch");
      }
      try
      {
        _stockService.Update(updatedItem);
        return Ok(updatedItem);
      }
      catch (Exception ex)
      {
        return NotFound(ex.Message);
      }

    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
      try
      {
        _stockService.Delete(id);
        return NoContent();
      }
      catch (Exception ex)
      {
        return NotFound(ex.Message);
      }

    }
  }
}