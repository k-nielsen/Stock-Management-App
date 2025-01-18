using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class StockController : ControllerBase
  {
    private readonly StockService _stockService = new();
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
      var item = _stockService.GetById(id);
      if (item is null)
      {
        return NotFound();
      }
      return Ok();
    }

    [HttpPost]
    public ActionResult Create(StockItem item)
    {
      _stockService.Add(item);
      return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public ActionResult Update(int id, StockItem item)
    {
      if (id != item.Id)
      {
        return BadRequest("Id mismatch");
      }
      try
      {
        _stockService.Update(item);
        return Ok();
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
        return Ok();
      }
      catch (Exception ex)
      {
        return NotFound(ex.Message);
      }

    }
  }
}