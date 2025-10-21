import { NextFunction, Request, Response } from 'express';
import { red, green, yellow, cyan, blue, gray } from 'colorette';

const getStatusColorizer = (statusCode: number) => {
  if (statusCode >= 500) return red;
  if (statusCode >= 400) return yellow;
  if (statusCode >= 300) return cyan;
  if (statusCode >= 200) return green;
  return gray;
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime(); 

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const duration = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3); 
    
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    const statusColorizer = getStatusColorizer(status);

    console.log(
      `${yellow(new Date().toLocaleTimeString())} ${blue(method)} ${url} ${statusColorizer(status)} ${gray(`- ${duration}ms`)}`
    );
  });

  next();
};

export { logger };