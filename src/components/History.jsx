function History({ history, onClear }) {
  return (
    <div className="history">

      <div className="history-header">
        <h3>Historial</h3>

        {history.length > 0 && (
          <button
            className="clear-history"
            onClick={onClear}
          >
            Limpiar
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="empty-history">
          No hay operaciones todavía
        </p>
      ) : (
        <div className="history-list">
          {history.map((operation, index) => (
            <div
              className="history-item"
              key={index}
            >
              <span>
                {operation.expression}
              </span>

              <strong>
                = {operation.result}
              </strong>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default History;
